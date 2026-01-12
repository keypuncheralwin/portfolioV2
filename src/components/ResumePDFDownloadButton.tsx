'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { Analytics, logEvent } from 'firebase/analytics';

interface Props {
    analytics: Analytics | null;
}

export default function ResumePDFDownloadButton({ analytics }: Props) {
    const [busy, setBusy] = useState(false);

    const handleClick = async () => {
        try {
            setBusy(true);

            if (analytics) {
                logEvent(analytics, 'resume_download', {
                    download_time: new Date().toISOString(),
                    file_name: 'Alwin_George_Resume.pdf',
                    method: 'react-pdf'
                });
            }

            // 1) Generate PDF blob
            const blob = await pdf(<ResumePDF />).toBlob();
            const url = URL.createObjectURL(blob);

            // 2) Try to trigger a real download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Alwin_George_Resume.pdf';
            a.rel = 'noopener';
            document.body.appendChild(a);
            a.click();
            a.remove();

            // 3) (Optional but recommended) Open a preview on mobile
            // iOS Safari often ignores "download" and prefers opening a new tab.
            // This gives the user something visible immediately.
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }

            // 4) Cleanup later (don’t revoke immediately or it can break open/download)
            setTimeout(() => URL.revokeObjectURL(url), 30_000);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setBusy(false);
        }
    };

    return (
        <button
            type="button"
            className="resume-download-btn"
            onClick={handleClick}
            disabled={busy}
        >
            {!busy && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
            )}
            {busy ? 'Generating PDF...' : 'Download PDF'}
        </button>
    );
}
