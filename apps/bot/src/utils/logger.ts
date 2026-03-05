const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m',
};

function timestamp(): string {
    return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

export const logger = {
    info: (message: string) => {
        console.log(`${colors.gray}[${timestamp()}]${colors.reset} ${colors.cyan}INFO${colors.reset}  ${message}`);
    },
    success: (message: string) => {
        console.log(`${colors.gray}[${timestamp()}]${colors.reset} ${colors.green}OK${colors.reset}    ${message}`);
    },
    warn: (message: string) => {
        console.log(`${colors.gray}[${timestamp()}]${colors.reset} ${colors.yellow}WARN${colors.reset}  ${message}`);
    },
    error: (message: string, err?: Error) => {
        console.error(`${colors.gray}[${timestamp()}]${colors.reset} ${colors.red}ERROR${colors.reset} ${message}`);
        if (err) console.error(err);
    },
    debug: (message: string) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`${colors.gray}[${timestamp()}]${colors.reset} ${colors.magenta}DEBUG${colors.reset} ${message}`);
        }
    },
    handler: (type: string, name: string) => {
        console.log(`${colors.gray}[${timestamp()}]${colors.reset} ${colors.blue}LOAD${colors.reset}  ${type} → ${colors.cyan}${name}${colors.reset}`);
    },
};
