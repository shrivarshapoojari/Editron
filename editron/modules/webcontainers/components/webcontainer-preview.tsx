"use client";
import React, { useEffect, useState, useRef } from "react";

import { transformToWebContainerFormat } from "../hooks/transformer";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

import { WebContainer } from "@webcontainer/api";
import { TemplateFolder } from "@/modules/playground/lib/path-to-json";
import TerminalComponent from "./terminal";

interface WebContainerPreviewProps {
  templateData: TemplateFolder;
  serverUrl: string;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  forceResetup?: boolean; // Optional prop to force re-setup
}
const WebContainerPreview = ({
  templateData,
  error,
  instance,
  isLoading,
  serverUrl,
  writeFileSync,
  forceResetup = false,
}: WebContainerPreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loadingState, setLoadingState] = useState({
    transforming: false,
    mounting: false,
    installing: false,
    starting: false,
    ready: false,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const [setupError, setSetupError] = useState<string | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isSetupInProgress, setIsSetupInProgress] = useState(false);

  const terminalRef = useRef<any>(null);

  // Reset setup state when forceResetup changes
  useEffect(() => {
    if (forceResetup) {
      setIsSetupComplete(false);
      setIsSetupInProgress(false);
      setPreviewUrl("");
      setCurrentStep(0);
      setLoadingState({
        transforming: false,
        mounting: false,
        installing: false,
        starting: false,
        ready: false,
      });
    }
  }, [forceResetup]);

  useEffect(() => {
    async function setupContainer() {
      if (!instance || isSetupComplete || isSetupInProgress) return;

      try {
        setIsSetupInProgress(true);
        setSetupError(null);

        try {
          const packageJsonExists = await instance.fs.readFile(
            "package.json",
            "utf8"
          );

          if (packageJsonExists) {
            // Files are already mounted, just reconnect to existing server
            if (terminalRef.current?.writeToTerminal) {
              terminalRef.current.writeToTerminal(
                "🔄 Reconnecting to existing WebContainer session...\r\n"
              );
            }

            instance.on("server-ready", (port: number, url: string) => {
              if (terminalRef.current?.writeToTerminal) {
                terminalRef.current.writeToTerminal(
                  `🌐 Reconnected to server at ${url}\r\n`
                );
              }

              setPreviewUrl(url);
              setLoadingState((prev) => ({
                ...prev,
                starting: false,
                ready: true,
              }));
            });

            setCurrentStep(4);
            setLoadingState((prev) => ({ ...prev, starting: true }));
            return;
          }
        } catch (error) {}

        // Step-1 transform data
        setLoadingState((prev) => ({ ...prev, transforming: true }));
        setCurrentStep(1);
        // Write to terminal
        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "🔄 Transforming template data...\r\n"
          );
        }

        // @ts-ignore
        const files = transformToWebContainerFormat(templateData);
        setLoadingState((prev) => ({
          ...prev,
          transforming: false,
          mounting: true,
        }));
        setCurrentStep(2);

        //  Step-2 Mount Files

        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "📁 Mounting files to WebContainer...\r\n"
          );
        }
        await instance.mount(files);

        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "✅ Files mounted successfully\r\n"
          );
        }
        setLoadingState((prev) => ({
          ...prev,
          mounting: false,
          installing: true,
        }));
        setCurrentStep(3);

        // Step-3 Install dependencies

        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "📦 Installing dependencies...\r\n"
          );
        }

        const installProcess = await instance.spawn("npm", ["install"]);

        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              if (terminalRef.current?.writeToTerminal) {
                terminalRef.current.writeToTerminal(data);
              }
            },
          })
        );

        const installExitCode = await installProcess.exit;

        if (installExitCode !== 0) {
          throw new Error(
            `Failed to install dependencies. Exit code: ${installExitCode}`
          );
        }

        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "✅ Dependencies installed successfully\r\n"
          );
        }

        setLoadingState((prev) => ({
          ...prev,
          installing: false,
          starting: true,
        }));
        setCurrentStep(4);

        // STEP-4 Start The Server

        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(
            "🚀 Starting development server...\r\n"
          );
        }

        const startProcess = await instance.spawn("npm", ["run", "start"]);

        instance.on("server-ready", (port: number, url: string) => {
          if (terminalRef.current?.writeToTerminal) {
            terminalRef.current.writeToTerminal(
              `🌐 Server ready at ${url}\r\n`
            );
          }
          setPreviewUrl(url);
          setLoadingState((prev) => ({
            ...prev,
            starting: false,
            ready: true,
          }));
          setIsSetupComplete(true);
          setIsSetupInProgress(false);
        });

        // Handle start process output - stream to terminal
        startProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              if (terminalRef.current?.writeToTerminal) {
                terminalRef.current.writeToTerminal(data);
              }
            },
          })
        );
      } catch (err) {
        console.error("Error setting up container:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (terminalRef.current?.writeToTerminal) {
          terminalRef.current.writeToTerminal(`❌ Error: ${errorMessage}\r\n`);
        }
        setSetupError(errorMessage);
        setIsSetupInProgress(false);
        setLoadingState({
          transforming: false,
          mounting: false,
          installing: false,
          starting: false,
          ready: false,
        });
      }
    }

    setupContainer();
  }, [instance, templateData, isSetupComplete, isSetupInProgress]);

  useEffect(() => {
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-950 to-black">
        <div className="text-center space-y-6 max-w-md p-8 rounded-2xl bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <h3 className="text-lg font-medium text-cyan-400">Initializing WebContainer</h3>
          <p className="text-sm text-gray-400">
            Setting up the environment for your project...
          </p>
        </div>
      </div>
    );
  }

  if (error || setupError) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-950 to-black">
        <div className="max-w-md p-8 rounded-2xl bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-red-500/30 shadow-2xl shadow-red-500/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="font-semibold text-red-400">Error</h3>
          </div>
          <p className="text-sm text-gray-300">{error || setupError}</p>
        </div>
      </div>
    );
  }
  const getStepIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      return (
        <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/50">
          <CheckCircle className="h-5 w-5 text-green-400" />
        </div>
      );
    } else if (stepIndex === currentStep) {
      return (
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-500/50">
          <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-600/50">
          <div className="h-3 w-3 rounded-full bg-gray-600" />
        </div>
      );
    }
  };

  const getStepText = (stepIndex: number, label: string) => {
    const isActive = stepIndex === currentStep;
    const isComplete = stepIndex < currentStep;

    return (
      <span
        className={`text-sm font-medium transition-colors ${
          isComplete
            ? "text-green-400"
            : isActive
            ? "text-cyan-400"
            : "text-gray-500"
        }`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-gray-950 to-black">
      {!previewUrl ? (
        <div className="h-full flex flex-col">
          <div className="w-full max-w-md p-6 m-5 rounded-2xl bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl mx-auto">
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="h-3 mb-6 bg-gray-800/50"
            />

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                {getStepIcon(1)}
                {getStepText(1, "Transforming template data")}
              </div>
              <div className="flex items-center gap-4">
                {getStepIcon(2)}
                {getStepText(2, "Mounting files")}
              </div>
              <div className="flex items-center gap-4">
                {getStepIcon(3)}
                {getStepText(3, "Installing dependencies")}
              </div>
              <div className="flex items-center gap-4">
                {getStepIcon(4)}
                {getStepText(4, "Starting development server")}
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="flex-1 p-4">
            <div className="h-full bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
              <TerminalComponent
                ref={terminalRef}
                webContainerInstance={instance}
                theme="dark"
                className="h-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex-1 rounded-t-xl overflow-hidden border border-gray-700/50">
            <iframe
              src={previewUrl}
              className="w-full h-full border-none bg-gray-950"
              title="WebContainer Preview"
            />
          </div>

          <div className="h-64 border-t border-gray-700/50">
            <div className="h-full bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-b-xl overflow-hidden">
              <TerminalComponent
                ref={terminalRef}
                webContainerInstance={instance}
                theme="dark"
                className="h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebContainerPreview;
