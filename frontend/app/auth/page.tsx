"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Smartphone, MessageCircle } from "lucide-react";
import { saveAuthData, type UserAuth } from "@/lib/auth-utils";

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("+63");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");

  // Philippines phone number validation
  const validatePhilippinesPhone = (
    phone: string
  ): { isValid: boolean; message?: string } => {
    // Remove all non-digit characters except + and spaces
    const cleanPhone = phone.replace(/[^\d+]/g, "");

    // Check if it starts with +63
    if (!cleanPhone.startsWith("+63")) {
      return { isValid: false, message: "Phone number must start with +63" };
    }

    // Extract the number after +63
    const numberAfterCountryCode = cleanPhone.substring(3);

    // Check if the number after +63 has exactly 10 digits
    if (numberAfterCountryCode.length !== 10) {
      return {
        isValid: false,
        message: "Phone number must have 10 digits after +63",
      };
    }

    // Check if it starts with 9 (mobile numbers in Philippines start with 9)
    if (!numberAfterCountryCode.startsWith("9")) {
      return {
        isValid: false,
        message: "Mobile number must start with 9 after +63",
      };
    }

    // Check if all characters are digits
    if (!/^\d+$/.test(numberAfterCountryCode)) {
      return {
        isValid: false,
        message: "Phone number contains invalid characters",
      };
    }

    return { isValid: true };
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Always start with +63
    if (!value.startsWith("+63")) {
      return "+63";
    }

    // Remove any non-digit characters after +63
    const digitsOnly = value.substring(3).replace(/\D/g, "");

    // Limit to 10 digits after +63
    const limitedDigits = digitsOnly.substring(0, 10);

    // Format as +63 9XX XXX XXXX
    if (limitedDigits.length <= 3) {
      return `+63${limitedDigits}`;
    } else if (limitedDigits.length <= 6) {
      return `+63 ${limitedDigits.substring(0, 3)} ${limitedDigits.substring(
        3
      )}`;
    } else {
      return `+63 ${limitedDigits.substring(0, 3)} ${limitedDigits.substring(
        3,
        6
      )} ${limitedDigits.substring(6)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhone);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = async () => {
    const validation = validatePhilippinesPhone(phoneNumber);

    if (!validation.isValid) {
      setError(validation.message || "Invalid phone number");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Generate and store OTP for simulation
      const newOTP = generateOTP();
      setGeneratedOTP(newOTP);

      setStep("otp");

      // Show the generated OTP in console for testing
      console.log(`🔐 Simulated OTP for ${phoneNumber}: ${newOTP}`);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Check if entered OTP matches generated OTP
      if (otp === generatedOTP) {
        // Save authentication state using utility
        const userAuth: UserAuth = {
          phoneNumber,
          isAuthenticated: true,
          authenticatedAt: new Date().toISOString(),
        };
        saveAuthData(userAuth);

        // Redirect to onboarding for location setup
        window.location.href = "/onboarding";
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("phone");
    setOtp("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text">PulsePH</h1>
          <p className="text-sm text-text-secondary mt-2">
            Feel the heartbeat of your local community
          </p>
          <p className="text-xs text-text-muted">
            LGU announcements right on your fingertips
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-surface">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl text-text">
              <Smartphone className="w-5 h-5" />
              {step === "phone" ? "Welcome to PulsePH" : "Verify Code"}
            </CardTitle>
            <CardDescription className="text-text-secondary">
              {step === "phone"
                ? "Enter your phone number to get started. Works for both new and existing users."
                : "Enter the 6-digit code"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-error/10 border border-error/20 rounded-md p-3 text-sm text-error">
                {error}
              </div>
            )}

            {step === "phone" ? (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-text"
                  >
                    Philippine Mobile Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="text-center font-mono"
                    disabled={loading}
                    maxLength={16}
                  />
                  <p className="text-xs text-text-muted text-center">
                    Philippines mobile numbers only (must start with +63 9XX)
                  </p>
                </div>
                <Button
                  onClick={handleSendOTP}
                  className="w-full bg-accent hover:bg-accent-light text-white"
                  disabled={loading}
                >
                  {loading ? "Generating Code..." : "Send Verification Code"}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="text-sm font-medium text-text"
                  >
                    Verification Code
                  </label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      disabled={loading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-text-muted text-center">
                    Code generated for {phoneNumber}
                  </p>
                  {generatedOTP && (
                    <p className="text-xs text-accent text-center bg-accent/10 p-2 rounded">
                      💡 Demo OTP: {generatedOTP}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={handleVerifyOTP}
                    className="w-full bg-accent hover:bg-accent-light text-white"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </Button>
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="w-full border-border text-text hover:bg-surface-raised"
                    disabled={loading}
                  >
                    Back
                  </Button>
                </div>
              </>
            )}

            <div className="text-center text-xs text-text-subtle mt-6">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
