import { CourierClient } from "@trycourier/courier";
export const courier = CourierClient({ authorizationToken: process.env.AUTH_COURIER });