import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Community = () => {
    const projects = [
        {
            title: "E-commerce Store",
            author: "john-dev",
            deployments: "1,203",
            category: "E-commerce",
            gradient: ""
        }
    ];


    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground flex justify-between">
                    <span>From the Community</span>
                    <span>fuzzy search bar</span>

                </h2>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {projects.map((project, index) => (
                        <Card key={index} className="group cursor-pointer hover:transform hover:scale-105 transition-all duration-300 overflow-hidden">
                            {/* Project Header with Gradient */}
                            <CardHeader className="relative h-48 overflow-hidden p-0">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                                <div className="absolute inset-0 bg-primary/10" />
                                <div className="absolute bottom-4 left-4 right-4 z-10">
                                    <CardTitle className="text-xl font-bold text-foreground mb-1">
                                        {project.title}
                                    </CardTitle>
                                    <span className="inline-block px-2 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs text-foreground border border-border">
                                        {project.category}
                                    </span>
                                </div>
                            </CardHeader>

                            {/* Project Info */}
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border border-border">
                                            <span className="text-muted-foreground text-xs font-bold">
                                                {project.author.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">{project.author}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-foreground font-semibold">{project.deployments}</div>
                                        <div className="text-muted-foreground text-xs">Deployments</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="text-center">
                    <Button variant="outline">
                        Show More
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Community; 