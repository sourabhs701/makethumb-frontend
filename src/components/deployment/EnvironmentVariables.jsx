import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, Plus, Minus } from "lucide-react";

const EnvironmentVariables = ({ envVars, setEnvVars, loading = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const updateEnvVar = useCallback((index, field, value) => {
        const newEnvVars = [...envVars];
        newEnvVars[index] = { ...newEnvVars[index], [field]: value };
        setEnvVars(newEnvVars);
    }, [envVars, setEnvVars]);

    const addEnvVar = useCallback(() => {
        setEnvVars([...envVars, { key: "", value: "" }]);
    }, [envVars, setEnvVars]);

    const removeEnvVar = useCallback((index) => {
        if (envVars.length > 1) {
            const newEnvVars = envVars.filter((_, i) => i !== index);
            setEnvVars(newEnvVars);
        }
    }, [envVars, setEnvVars]);

    return (
        <div className="space-y-2">
            <div
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                ) : (
                    <ChevronRight className="w-4 h-4" />
                )}
                <Label className="font-medium text-sm cursor-pointer">Environment Variables</Label>
            </div>

            {isExpanded && (
                <div className="space-y-3 pl-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <span className="flex-1">Key</span>
                        <span className="flex-1">Value</span>
                        <span className="w-8"></span>
                    </div>

                    {envVars.map((envVar, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                disabled={loading}
                                value={envVar.key}
                                onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                                placeholder="EXAMPLE_NAME"
                                className="flex-1 text-sm"
                            />
                            <Input
                                disabled={loading}
                                value={envVar.value}
                                onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                                placeholder="I9JU23NF394R6HH"
                                className="flex-1 text-sm"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0"
                                onClick={() => removeEnvVar(index)}
                                disabled={loading || envVars.length === 1}
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-sm"
                        onClick={addEnvVar}
                        disabled={loading}
                    >
                        <Plus className="w-4 h-4" />
                        Add More
                    </Button>

                </div>
            )}
        </div>
    );
};

export default EnvironmentVariables;