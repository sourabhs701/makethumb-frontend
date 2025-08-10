
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Minus, Info } from "lucide-react";
import { Input } from "@/components/ui/input";

const EnvironmentVariables = ({ envVars, setEnvVars, loading = false }) => {

    const updateEnvVar = (index, field, value) => {
        const updated = [...envVars];
        updated[index][field] = value;
        setEnvVars(updated);
    };

    const addEnvVar = () => setEnvVars([...envVars, { key: "", value: "" }]);

    const removeEnvVar = (index) => {
        const updated = envVars.filter((_, i) => i !== index);
        setEnvVars(updated);
    };


    return (
        <div className="space-y-2">
            <div className="space-y-3 pl-6">
                {envVars.map((envVar, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            disabled={loading}
                            value={envVar.key}
                            onChange={(e) => updateEnvVar(index, "key", e.target.value)}
                            placeholder="KEY"
                            className="flex-1"
                        />
                        <Input
                            disabled={loading}
                            value={envVar.value}
                            onChange={(e) => updateEnvVar(index, "value", e.target.value)}
                            placeholder="VALUE"
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEnvVar(index)}
                            disabled={loading}
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                    </div>
                ))}

                <div className="flex justify-end items-center gap-2">

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addEnvVar}
                        disabled={loading}
                        className="text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Environment Variable
                    </Button>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p className="text-sm">ROOT_DIR : / (default)</p>
                            <p className="text-sm">INSTALL_COMMADND: npm install (default)</p>
                            <p className="text-sm">BUILD_COMMAND : npm build (default)</p>

                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

        </div>
    );
};

export default EnvironmentVariables;
