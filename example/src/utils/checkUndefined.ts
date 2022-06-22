export const getUndefinedVarErrMessage = (variables: Record<string, any>): string | undefined => {
    const undefinedVarsNames: string[] = [];
    Object.entries(variables).map((entry: any[]) => {
        if (entry[1] === undefined) {
            undefinedVarsNames.push(entry[0]);
        }
    });
    if (undefinedVarsNames.length !== 0) {
        const undefinedVarsString = undefinedVarsNames.join(', ');
        return `Expected variable(s): ${undefinedVarsString} to hold a value but got undefined`;
    } else {
        return undefined;
    }
};