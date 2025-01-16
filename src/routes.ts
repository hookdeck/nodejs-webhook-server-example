import express, { Request, Response, NextFunction } from "express";
import { verifyWebhookSignature } from "@hookdeck/sdk/webhooks/helpers";
import crypto from "crypto";

import { IncomingHttpHeaders } from "http";
import { Request as ExpressRequest } from "express";

const SECRET: string = import.meta.env.VITE_HOOKDECK_SIGNING_SECRET || "";

const router = express.Router();

if (!SECRET) {
  console.warn("No Hookdeck Signing Secret set!");
}
// console.log({ SECRET });

const verifyHookdeckSignature = async (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
) => {
  if (!SECRET) {
    console.warn(
      "No Hookdeck Signing Secret: Skipping webhook verification. Do not do this in production!"
    );
    return next();
  }

  const headers: { [key: string]: string } = {};
  const incomingHeaders = req.headers as IncomingHttpHeaders;

  for (const [key, value] of Object.entries(incomingHeaders)) {
    headers[key] = value as string;
  }

  // console.log({ headers });

  const rawBody = req.rawBody.toString();
  // console.log({ rawBody });

  const result = await verifyWebhookSignature({
    headers,
    rawBody,
    signingSecret: SECRET,
    config: {
      checkSourceVerification: false,
    },
  });

  if (!result.isValidSignature) {
    console.log("Signature is invalid, rejected");
    res.sendStatus(401);
  } else {
    console.log("Signature is valid, accepted");
    next();
  }
};

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Webhooks API");
});

// TEST
router.post(
  "/testing",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.headers);
    res.send("Tested");
  }
);

// PAYMENTS
router.post(
  "/stripe-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Stripe: Successfully received Webhook request");
  }
);

router.post(
  "/paypal-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Paypal: Successfully received Webhook request");
  }
);

router.post(
  "/paddle-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Paddle: Successfully received Webhook request");
  }
);

router.post(
  "/checkout-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Checkout: Successfully received Webhook request");
  }
);

// CI/CD
router.post(
  "/github-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("GitHub: Successfully received Webhook request");
  }
);

router.post(
  "/gitlab-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Gitlab: Successfully received Webhook request");
  }
);

router.post(
  "/bitbucket-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Bitbucket: Successfully received Webhook request");
  }
);

router.post(
  "/docker-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Docker: Successfully received Webhook request");
  }
);

// E-COMM
function verifyShopifySignature(req, res, next) {
  const sigHeaderName = "x-shopify-hmac-sha256";
  const secret = process.env.VITE_SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.log("No Shopify secret configured");
    return next();
  }
  if (!req.rawBody) {
    return next("Request body empty");
  }
  const body = req.rawBody;
  const hmacHeader = req.get(sigHeaderName);

  // Create a hash based on the parsed body
  const hash = crypto
    .createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("base64");

  // Compare the created hash with the value of the X-Shopify-Hmac-Sha256 Header
  if (hash !== hmacHeader) {
    return next(
      `Request body digest (${hash}) did not match ${sigHeaderName} (${hmacHeader})`
    );
  } else {
    console.log("Shopify: Signature is valid, accepted");
  }
  return next();
}

router.post(
  "/shopify-webhooks-endpoint",
  verifyHookdeckSignature,
  verifyShopifySignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Shopify: Successfully received Webhook request");
  }
);

router.post(
  "/bigcommerce-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("BigCommerce Successfully received Webhook request");
  }
);

router.post(
  "/woocommerce-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("WooCommerce: Successfully received Webhook request");
  }
);

router.post(
  "/commercelayer-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Commerce Layer: Successfully received Webhook request");
  }
);

// CRM
router.post(
  "/hubspot-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("HubSpot: Successfully received Webhook request");
  }
);

router.post(
  "/pipedrive-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Pipedrive: Successfully received Webhook request");
  }
);

// EXTRAS
router.post(
  "/okta-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Okta Event hook Successfully received");
  }
);

export default router;
