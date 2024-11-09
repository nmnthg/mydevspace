"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Profile({ user }) {
  if (!user) {
    return (
      <div className="container mx-auto mt-10 p-4">Loading user profile...</div>
    );
  }

  if (!user.name || !user.title) {
    return (
      <div className="container mx-auto mt-10 p-4">
        Missing user information
      </div>
    );
  }

  return (
    <div className="container mt-10 pr-4">
      <h1 className="text-4xl font-bold">{user.name}</h1>
      <h4 className="text-xl mb-4">{user.title}</h4>

      {/* Links */}
      <div className="flex flex-row space-x-4 mb-4">
        {user.github && (
          <Link
            href={user.github}
            className="text-blue-600 font-bold no-underline flex items-center"
          >
            GitHub
          </Link>
        )}
        {user.linkedin && (
          <Link
            href={user.linkedin}
            className="text-blue-600 font-bold no-underline flex items-center"
          >
            LinkedIn
          </Link>
        )}
      </div>

      {/* Display Resume */}
      {user.resume && (
        <div className="resume-section">
          <div
            style={{
              height: "300px",
              width: "400px",
              border: "1px solid #ddd",
              overflow: "hidden",
            }}
          >
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={user.resume} defaultScale={0.6} />
            </Worker>
          </div>
        </div>
      )}

      {/* Download Resume Button */}
      {user.resume && (
        <div className="mt-4">
          <Button>
            <a href={user.resume} download="Resume.pdf" className="text-white">
              Download Resume
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Profile;
