'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import axios from 'axios'
import { useRef } from 'react'
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UploadCloud } from 'lucide-react'

const ResumePage = () => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false)
    const token = localStorage.getItem('token')

    async function handleUpload(e) {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            console.log('No file selected');
            return;
        }

        console.log('Selected file:', selectedFile);
        console.log('File details:', {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size
        });

        setUploading(true);
        const loadingToast = toast.loading(`Uploading ${selectedFile.name}...`);

        try {
            console.log('Getting presigned URL...');
            const uploadRes = await axios.get(
                `http://localhost:3000/upload?filename=${encodeURIComponent(selectedFile.name)}&contentType=${encodeURIComponent(selectedFile.type)}&size=${selectedFile.size}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log('Upload response:', uploadRes.data);
            const { uploadUrl, key } = uploadRes.data;

            console.log('Uploading to S3...');
            // Upload to S3 using the presigned URL
            await axios.put(uploadUrl, selectedFile, {
                headers: { "Content-Type": selectedFile.type, }
            });

            console.log('Confirming upload with backend...');
            // Confirm upload with backend
            await axios.post(
                "http://localhost:3000/files/confirm",
                { filename: selectedFile.name, size: selectedFile.size, key },
                { headers: { "Authorization": `Bearer ${token}` } }
            );

            console.log('Upload completed successfully');
            toast.success(`Successfully uploaded ${selectedFile.name}`, { id: loadingToast });
            fileInputRef.current.value = null;
        } catch (error) {
            console.error('Upload error:', error);

            // Handle specific error messages from backend
            let errorMessage = "Upload failed";
            if (error.response?.data?.error) {
                const backendError = error.response.data.error;
                console.log('Backend error:', backendError);
                if (backendError === "Storage limit exceeded") {
                    errorMessage = "❌ Storage limit exceeded! Please free up space or upgrade your plan.";
                } else {
                    errorMessage = `Upload failed: ${backendError}`;
                }
            } else {
                console.log('Generic error:', error.message);
                errorMessage = `Upload failed: ${error.message}`;
            }

            toast.error(errorMessage, { id: loadingToast });
        } finally {
            console.log('Upload process finished');
            setUploading(false);
        }
    }


    return (
        <>
            <Header />
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-4">Resume Parser</h1>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Upload File</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                onClick={() => !uploading && fileInputRef.current.click()}
                                className={`border border-dashed border-border rounded-md p-6 text-center cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'
                                    }`}
                            >
                                <UploadCloud className="mx-auto mb-2" size={48} />
                                <p className="font-medium">
                                    {uploading ? 'Uploading...' : 'Click to upload a file'}
                                </p>
                                <p className="text-xs text-muted-foreground">Single file upload</p>
                                <input
                                    type="file"
                                    accept="*/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleUpload}
                                    disabled={uploading}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </>
    )
}

export default ResumePage
