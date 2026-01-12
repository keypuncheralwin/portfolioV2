'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import { Analytics } from 'firebase/analytics';
import { logEvent } from 'firebase/analytics';

interface ResumePDFDownloadButtonProps {
    analytics: Analytics | null;
}

const ResumePDFDownloadButton: React.FC<ResumePDFDownloadButtonProps> = ({ analytics }) => {
    const handleDownloadClick = () => {
        if (analytics) {
            logEvent(analytics, 'resume_download', {
                download_time: new Date().toISOString(),
                file_name: 'Alwin_George_Resume.pdf',
                method: 'react-pdf'
            });
        }
    };

    return (
        <PDFDownloadLink
            document={<ResumePDF />}
            fileName="Alwin_George_Resume.pdf"
            className="resume-download-btn"
            style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
            }}
            onClick={handleDownloadClick}
        >
            {({ blob, url, loading, error }) => (
                <>
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
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                </>
            )}
        </PDFDownloadLink>
    );
};

export default ResumePDFDownloadButton;
