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
        ("620", 620, 900),
        ("621", 621, 900),
        ("768", 768, 1024),
        ("1440", 1440, 900),
    ]:
        page.set_viewport_size({"width": width, "height": height})
        navigation = page.get_by_role("navigation", name="Primary navigation")
        menu_toggle = page.get_by_role("button", name="Menu", exact=True)
        if width <= 620:
            assert menu_toggle.is_visible(), f"Menu toggle should be visible at {name}px"
            assert not navigation.is_visible(), f"Navigation should start closed at {name}px"
            assert menu_toggle.get_attribute("aria-expanded") == "false"
            cta = page.locator(".header-cta")
            assert cta.is_visible(), f"Enquire CTA should be visible at {name}px"
            cta_box = cta.bounding_box()
            toggle_box = menu_toggle.bounding_box()
            assert cta_box and toggle_box
            assert cta_box["height"] >= 44, f"CTA is too short at {name}px: {cta_box}"
            assert toggle_box["height"] >= 44, f"Menu toggle is too short at {name}px: {toggle_box}"
            assert cta_box["height"] == toggle_box["height"], (
                f"CTA and menu toggle heights differ at {name}px: {cta_box}, {toggle_box}"
            )
            cta_center = cta_box["y"] + cta_box["height"] / 2
            toggle_center = toggle_box["y"] + toggle_box["height"] / 2
            assert abs(cta_center - toggle_center) <= 0.5, (
                f"CTA and menu toggle are not vertically centered at {name}px: {cta_box}, {toggle_box}"
            )
        else:
            assert navigation.is_visible(), f"Desktop navigation should be visible at {name}px"
            assert menu_toggle.is_hidden(), f"Menu toggle should be hidden at {name}px"

        overflow = page.evaluate(
            """() => [...document.querySelectorAll('body *')]
                .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
                .slice(0, 8).map((element) => `${element.tagName}.${element.className}`)"""
        )
        assert not overflow, f"{name}px viewport overflow: {overflow}"
        page.screenshot(path=f"/tmp/loler-{name}.png", full_page=True, animations="disabled")

    page.set_viewport_size({"width": 1440, "height": 900})
    page.goto(URL, wait_until="networkidle")
    page.locator('#primary-navigation a[href="#services"]').evaluate("link => link.click()")
    assert page.evaluate("() => location.hash") == "#services"
    assert page.evaluate("() => document.activeElement.id !== 'services-title'"), (
        "Desktop anchor navigation should retain native focus behavior"
    )

    for width in (320, 390, 620):
        page.set_viewport_size({"width": width, "height": 844})
        page.goto(URL, wait_until="networkidle")
        menu_toggle = page.get_by_role("button", name="Menu", exact=True)
        navigation = page.get_by_role("navigation", name="Primary navigation")
        cta = page.get_by_role("link", name="Make an enquiry", exact=True).first
        menu_toggle.click()
        assert menu_toggle.get_attribute("aria-expanded") == "true"
        assert cta.is_visible(), f"Enquire CTA should remain visible while open at {width}px"
        assert navigation.is_visible()
        assert navigation.get_by_role("link").count() == 4
        row_heights = navigation.get_by_role("link").evaluate_all(
            "links => links.map(link => link.getBoundingClientRect().height)"
        )
        assert all(height >= 44 for height in row_heights), f"Navigation rows too short at {width}px: {row_heights}"
        expanded_overflow = page.evaluate(
            """() => [...document.querySelectorAll('body *')]
                .filter(element => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
                .slice(0, 8).map(element => `${element.tagName}.${element.className}`)"""
        )
        assert not expanded_overflow, f"Expanded menu overflow at {width}px: {expanded_overflow}"
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto(URL, wait_until="networkidle")
    menu_toggle = page.get_by_role("button", name="Menu", exact=True)
    navigation = page.get_by_role("navigation", name="Primary navigation")
    cta.focus()
    page.keyboard.press("Tab")
    assert menu_toggle.evaluate("element => document.activeElement === element"), (
        "Tab from the visible CTA should focus the menu toggle"
    )
    page.keyboard.press("Enter")
    assert menu_toggle.get_attribute("aria-expanded") == "true"
    assert navigation.is_visible()
    assert navigation.get_by_role("link").count() == 4
    navigation.get_by_role("link", name="Services", exact=True).click()
    assert page.evaluate("() => location.hash") == "#services", (
        f"Services link did not preserve the URL hash: {page.url}"
    )
    assert menu_toggle.get_attribute("aria-expanded") == "false"
    assert not navigation.is_visible()
    assert page.evaluate("() => document.activeElement.id") == "services-title", (
        "Mouse activation should move focus to the Services heading"
    )

    menu_toggle.click()
    cta = page.get_by_role("link", name="Make an enquiry", exact=True).first
    cta.click()
    assert page.evaluate("() => location.hash") == "#contact", "Enquiry CTA should follow its anchor"
    assert menu_toggle.get_attribute("aria-expanded") == "false", "Enquiry CTA should close the open menu"
    assert not navigation.is_visible(), "Navigation should close after activating the enquiry CTA"

    menu_toggle.focus()
    page.keyboard.press("Enter")
    assert menu_toggle.get_attribute("aria-expanded") == "true"
    assert navigation.is_visible()
    page.keyboard.press("Tab")
    first_link = navigation.get_by_role("link").nth(0)
    assert first_link.evaluate("element => document.activeElement === element"), (
        "Tab from the menu toggle should focus the first navigation link"
    )
    focus_style = first_link.evaluate("""element => {
        const style = getComputedStyle(element);
        return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
    }""")
    assert focus_style["outlineStyle"] != "none" and focus_style["outlineWidth"] != "0px", focus_style
    page.keyboard.press("Enter")
    assert page.evaluate("() => location.hash") == "#services", (
        f"Keyboard activation did not preserve the URL hash: {page.url}"
    )
    assert menu_toggle.get_attribute("aria-expanded") == "false"
    assert not navigation.is_visible()
    assert page.evaluate("() => document.activeElement.id") == "services-title", (
        "Keyboard activation should move focus to the Services heading"
    )

    page.goto(URL + "privacy/", wait_until="networkidle")
    assert page.get_by_role("heading", name="Privacy notice draft").is_visible()
    assert not errors, f"Browser errors: {errors}"
    browser.close()

print("Responsive browser checks passed at 320, 390, 620, 621, 768, and 1440 pixels.")
