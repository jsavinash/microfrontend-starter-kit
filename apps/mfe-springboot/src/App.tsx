import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ---------- Spring Boot Content Component ----------
const SpringBootContent: React.FC = () => {
    const [content, setContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;

        const fetchContent = async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                // Use a CORS proxy to fetch the external content
                const response = await fetch(
                    "https://api.allorigins.win/raw?url=" +
                    encodeURIComponent(
                        "https://www.geeksforgeeks.org/advance-java/spring-boot/",
                    ),
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch: ${response.status} ${response.statusText}`,
                    );
                }

                const html = await response.text();

                if (cancelled) return;

                // Extract the main article content from the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                // Try to find the main content area
                const article =
                    doc.querySelector("article") ||
                    doc.querySelector(".entry-content") ||
                    doc.querySelector(".text") ||
                    doc.querySelector("main") ||
                    doc.querySelector('[role="main"]');

                const extractedContent =
                    article?.innerHTML ||
                    // Fallback: try to get the body content with some filtering
                    doc.body.innerHTML;

                // Create a sanitized version
                const sanitized = sanitizeContent(extractedContent);

                if (cancelled) return;
                setContent(sanitized);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load Spring Boot content:", error);
                if (!cancelled) {
                    setIsLoading(false);
                    setHasError(true);
                }
            }
        };

        fetchContent();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        // After content is set, enhance links to open in new tabs
        if (content && contentRef.current) {
            const links = contentRef.current.querySelectorAll("a");
            links.forEach((link) => {
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noopener noreferrer");
            });
        }
    }, [content]);

    const sanitizeContent = (rawHtml: string): string => {
        // Remove scripts, iframes, style tags for security
        let sanitized = rawHtml.replace(
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            "",
        );
        sanitized = sanitized.replace(
            /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
            "",
        );
        sanitized = sanitized.replace(
            /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
            "",
        );
        sanitized = sanitized.replace(
            /<link\b[^<]*(?:(?!>)[^<]*)*>/gi,
            "",
        );

        // Remove navigation elements, sidebars, footers, etc.
        sanitized = sanitized.replace(
            /<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi,
            "",
        );

        return sanitized;
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    🍃 Spring Boot
                </h1>
                <p className="mt-2 text-gray-600">
                    Comprehensive guide to Spring Boot — loaded from
                    GeeksforGeeks.
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
                        <p className="text-gray-500">
                            Loading Spring Boot content...
                        </p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {hasError && (
                <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-red-200 bg-red-50">
                    <div className="text-center">
                        <span className="text-4xl">⚠️</span>
                        <h2 className="mt-4 text-xl font-semibold text-red-700">
                            Failed to load content
                        </h2>
                        <p className="mt-2 text-red-600">
                            Unable to fetch the Spring Boot guide. This may be
                            due to CORS restrictions. You can open it directly
                            instead.
                        </p>
                        <a
                            href="https://www.geeksforgeeks.org/advance-java/spring-boot/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                            Open in new tab
                        </a>
                        <button
                            onClick={() => {
                                setContent(null);
                                setIsLoading(true);
                                setHasError(false);
                                // Trigger re-fetch via key change by toggling state
                                setTimeout(() => {
                                    window.location.reload();
                                }, 100);
                            }}
                            className="ml-3 mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Fetched Content */}
            {content && !isLoading && !hasError && (
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2">
                        <div className="flex gap-1.5">
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500" />
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                        </div>
                        <span className="ml-2 text-xs text-gray-500">
                            https://www.geeksforgeeks.org/advance-java/spring-boot/
                        </span>
                    </div>
                    <div
                        ref={contentRef}
                        className="springboot-content p-6"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            )}

            {/* Direct link fallback */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                    Prefer the original source?{" "}
                    <a
                        href="https://www.geeksforgeeks.org/advance-java/spring-boot/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-green-600 underline hover:text-green-700"
                    >
                        Open GeeksforGeeks article in a new tab →
                    </a>
                </p>
            </div>
        </div>
    );
};

// ---------- Spring Boot App ----------
const SpringBootApp: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SpringBootContent />} />
                <Route path="*" element={<Navigate to="." replace />} />
            </Routes>
        </div>
    );
};

export default SpringBootApp;