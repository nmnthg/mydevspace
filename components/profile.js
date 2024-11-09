"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PdfViewer from "./pdf-viewer";

function Profile({ user }) {
  if (!user) {
    return (
      <div className="container mx-auto mt-10 p-4">Loading user profile...</div>
    );
  }

  if (!user.name || !user.title || !user.resume) {
    return (
      <div className="container mx-auto mt-10 p-4">
        Missing user information
      </div>
    );
  }

  return (
    <div className="container mt-10 pr-4">
      <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
      <h2 className="text-2xl mb-4">{user.title}</h2>

      {/* Links */}
      <div className="space-x-4 mb-6">
        {user.github && (
          <Link href={user.github} passHref legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              GitHub
            </a>
          </Link>
        )}
        {user.linkedin && (
          <Link href={user.linkedin} passHref legacyBehavior>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          </Link>
        )}
      </div>

      {/* Display Resume */}
       {user.resume && 
        <PdfViewer url={user.resume} />
      //   (
      //   <div className="resume-section">
      //     <h3 className="text-xl font-semibold mb-2">Resume</h3>
      //     <div
      //       style={{
      //         height: "300px",
      //         width: "400px",
      //         border: "1px solid #ddd",
      //         overflow: "hidden",
      //       }}
      //     >
      //       <Worker
      //         workerUrl={`https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js`}
      //       >
      //         <Viewer fileUrl={user.resume} defaultScale={0.6} />
      //       </Worker>
      //     </div>
      //   </div>
      // )
      }

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
