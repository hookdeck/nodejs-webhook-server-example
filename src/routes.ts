import express, { Request, Response, NextFunction } from "express";
import { verifyWebhookSignature } from "@hookdeck/sdk/webhooks/helpers";

import qs from "querystring";
import { IncomingHttpHeaders } from "http";
import { Request as ExpressRequest } from "express";

const SECRET: string = process.env.HOOKDECK_SIGNING_SECRET || "";

const router = express.Router();

interface RequestWithRawBody extends ExpressRequest {
  rawBody: Buffer;
}

if (!SECRET) {
  console.warn("No Hookdeck Signing Secret set!");
}

console.log("hello");

const verifyHookdeckSignature = async (
  req: RequestWithRawBody,
  res: Response,
  next: NextFunction
) => {
  if (!SECRET) {
    console.warn("No Hookdeck Signing Secret: Skipping webhook verification ");
    return next();
  }

  const headers: { [key: string]: string } = {};
  const incomingHeaders = req.headers as IncomingHttpHeaders;

  for (const [key, value] of Object.entries(incomingHeaders)) {
    headers[key] = value as string;
  }

  const rawBody = req.rawBody.toString();
  const result = await verifyWebhookSignature({
    headers,
    rawBody,
    signingSecret: SECRET,
    config: {
      checkSourceVerification: true,
    },
  });

  if (!result.isValidSignature) {
    console.log("Signature is invalid, rejected");
    res.sendStatus(403); // Forbidden
  } else {
    next(); // Proceed to the next middleware/route handler
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
    res.send("Stripe Successfully received Webhook request");
  }
);

router.post(
  "/paypal-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Paypal Successfully received Webhook request");
  }
);

router.post(
  "/paddle-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(qs.parse(decodeURIComponent((req.body as any).toString())));
    res.send("Paddle Successfully received Webhook request");
  }
);

router.post(
  "/checkout-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Checkout Successfully received Webhook request");
  }
);

// CI/CD
router.post(
  "/github-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("GitHub Successfully received Webhook request");
  }
);

router.post(
  "/gitlab-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Gitlab Successfully received Webhook request");
  }
);

router.post(
  "/bitbucket-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Bitbucket Successfully received Webhook request");
  }
);

router.post(
  "/docker-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Docker Successfully received Webhook request");
  }
);

// E-COMM
router.post(
  "/shopify-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Shopify Successfully received Webhook request");
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
    res.send("WooCommerce Successfully received Webhook request");
  }
);

router.post(
  "/commercelayer-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Commerce Layer Successfully received Webhook request");
  }
);

// CRM
router.post(
  "/hubspot-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("HubSpot Successfully received Webhook request");
  }
);

router.post(
  "/pipedrive-webhooks-endpoint",
  verifyHookdeckSignature,
  (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Pipedrive Successfully received Webhook request");
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
