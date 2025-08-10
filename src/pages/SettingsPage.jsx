import React from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-foreground">Settings</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-foreground">Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                {avatar ? (
                                    <img src={avatar} alt="Avatar" className="h-16 w-16 rounded-full" />
                                ) : (
                                    <div className="h-16 w-16 rounded-full bg-muted" />
                                )}
                                <div>
                                    <div className="text-sm text-muted-foreground">Signed in as</div>
                                    <div className="font-medium text-foreground">{username || "Unknown"}</div>
                                </div>
                            </div>
                            <div>
                                <Label className="text-foreground">Email</Label>
                                <Input disabled placeholder="Connected via OAuth" className="bg-input" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}


