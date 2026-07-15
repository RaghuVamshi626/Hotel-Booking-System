import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Concierge Chat Grounded with Hotels Context
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, hotelsContext } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          text: "I am ready to assist you! However, the administrator has not yet configured the GEMINI_API_KEY. Please provide this in the Settings > Secrets panel of your AI Studio environment.",
        });
      }

      // Convert history to appropriate system structure if needed or pass as context
      const formattedHistory = history
        ? history
            .slice(-6)
            .map(
              (h) => `${h.role === "user" ? "Guest" : "Concierge"}: ${h.text}`,
            )
            .join("\n")
        : "";

      const systemInstruction = `
You are the highly sophisticated, warm, and elite AI Concierge for Aura Haven Luxury Resort Sanctuaries.
You have access to our live hotel ledger. Your primary role is to assist guests in finding and reserving the perfect room, recommending packages, planning multi-day custom vacation itineraries, or answering resort inquiries with absolute poise and hospitality.

Our Current Live Resorts and Suites Availability Catalog:
${JSON.stringify(hotelsContext, null, 2)}

Instructions:
1. Always maintain a luxurious, professional, helpful, and sophisticated hotelier persona. Greet guests politely (e.g. use terms like "Bonjour", "Certainly", "It would be my absolute pleasure").
2. Answer questions based on the live inventory above. If a user asks for luxury rooms, check the room prices and amenities and name the available suites explicitly.
3. Be precise with calculations. If a guest asks for prices, compute the rates based on the room pricing.
4. When requested, create beautiful, formatted markdown-style travel itineraries (e.g. Day 1, Day 2, Day 3) featuring wellness spa activities, ocean dives, and gourmet dining at our Michelin-starred venues.
5. Keep your tone encouraging and welcoming.
`;

      const prompt = `
Current Conversation Context:
${formattedHistory}

Guest's Current Inquiry:
${message}

Please provide a helpful, elegant, and grounded response as the Aura Haven Concierge:
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        text: `My sincere apologies, but I encountered an issue consulting our resort networks. (Details: ${error.message || "Unknown network delay"})`,
      });
    }
  });

  // REST Mock Endpoint: SignUp / Login (To emulate Spring Boot Auth REST controller behavior in live preview)
  app.post("/api/auth/signup", (req, res) => {
    const { email, password, fullName, role } = req.body;
    res.json({
      status: "SUCCESS",
      user: {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        email,
        fullName,
        role: role || "GUEST",
        loyaltyPoints: 1250,
        loyaltyTier: "Gold",
      },
    });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    res.json({
      status: "SUCCESS",
      user: {
        id: "user_active",
        email,
        fullName: "Sarah Jenkins",
        role: email.includes("admin") ? "ADMIN" : "GUEST",
        loyaltyPoints: 3400,
        loyaltyTier: "Platinum",
      },
    });
  });

  // Mock REST API: Bookings Controller endpoint
  app.get("/api/bookings", (req, res) => {
    res.json({
      status: "SUCCESS",
      bookings: [
        {
          id: "AH-883921",
          userId: "guest_123",
          hotelId: "resort_bali",
          hotelName: "The Grand Oasis Resort & Spa",
          roomNumber: "101",
          roomType: "Grand Lagoon Villa",
          checkIn: "2026-07-20",
          checkOut: "2026-07-24",
          guests: 2,
          totalAmount: 1280,
          status: "UPCOMING",
          paymentStatus: "PAID",
          addons: ["Organic Breakfast Buffet", "Airport Private Tesla Shuttle"],
        },
      ],
    });
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aura Haven full-stack server running on port ${PORT}`);
  });
}

startServer();
