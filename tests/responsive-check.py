from pathlib import Path
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4321/"

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.goto(URL, wait_until="networkidle")

    assert page.get_by_role("heading", level=1).count() == 1
    assert page.get_by_role("navigation", name="Primary navigation").is_visible()
    assert page.locator("fieldset[disabled]").count() == 1
    assert page.locator("a[href^='tel:']").count() == 0
    assert page.locator("img").evaluate_all("images => images.every(image => image.complete && image.naturalWidth > 0)")

    for _ in range(16):
        page.keyboard.press("Tab")
        focus_style = page.evaluate("""() => {
            const element = document.activeElement;
            if (!element || element === document.body) return null;
            const style = getComputedStyle(element);
            return { tag: element.tagName, outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
        }""")
        if focus_style:
            assert focus_style["outlineStyle"] != "none" and focus_style["outlineWidth"] != "0px", focus_style

    for name, width, height in [
        ("320", 320, 800),
        ("390", 390, 844),
        ("768", 768, 1024),
        ("1440", 1440, 900),
    ]:
        page.set_viewport_size({"width": width, "height": height})
        overflow = page.evaluate(
            """() => [...document.querySelectorAll('body *')]
                .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
                .slice(0, 8).map((element) => `${element.tagName}.${element.className}`)"""
        )
        assert not overflow, f"{name}px viewport overflow: {overflow}"
        page.screenshot(path=f"/tmp/loler-{name}.png", full_page=True, animations="disabled")

    page.goto(URL + "privacy/", wait_until="networkidle")
    assert page.get_by_role("heading", name="Privacy notice draft").is_visible()
    assert not errors, f"Browser errors: {errors}"
    browser.close()

print("Responsive browser checks passed at 320, 390, 768, and 1440 pixels.")
