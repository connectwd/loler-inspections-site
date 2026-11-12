import type { APIContext } from "astro";

const TURNSTILE_SECRET_KEY = import.meta.env.TURNSTILE_SECRET_KEY;

const STATICFORMS_ENDPOINT = "https://api.staticforms.dev/submit";
const TURNSTILE_SITEVERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export async function onRequest(context: APIContext): Promise<Response> {
  // Only accept POST
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Parse form data
  const formData = await context.request.formData();
  const turnstileToken = formData.get("cf-turnstile-response") as string;
  const honeypot = formData.get("honeypot") as string;

  // Honeypot check: if filled, it's a bot
  if (honeypot && honeypot.trim() !== "") {
    return new Response("Spam detected", { status: 400 });
  }

  // Turnstile token required
  if (!turnstileToken) {
    return new Response("Turnstile verification required", { status: 400 });
  }

  // Validate Turnstile token via Siteverify API
  let turnstileResult: TurnstileVerifyResponse;
  try {
    const verifyResponse = await fetch(TURNSTILE_SITEVERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: context.request.headers.get("x-forwarded-for") ?? "",
      }),
    });
    turnstileResult = (await verifyResponse.json()) as TurnstileVerifyResponse;
  } catch {
    return new Response("Verification service unavailable", { status: 502 });
  }

  if (!turnstileResult.success) {
    return new Response("Turnstile verification failed", { status: 400 });
  }

  // Forward valid submission to StaticForms
  try {
    const staticFormsResponse = await fetch(STATICFORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as unknown as Record<string, string>),
    });

    if (!staticFormsResponse.ok) {
      return new Response("Enquiry submission failed", { status: 502 });
    }

    return new Response("Enquiry submitted successfully", { status: 200 });
  } catch {
    return new Response("Enquiry submission failed", { status: 502 });
  }
}