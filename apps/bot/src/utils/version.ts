import path from 'path';
import fs from 'fs';

interface VersionInfo {
    version: string;
    changelog: {
        version: string;
        date: string;
        changes: string[];
    }[];
}

let versionCache: VersionInfo | null = null;

export function getVersionInfo(): VersionInfo {
    if (versionCache) return versionCache;

    const versionPath = path.resolve(__dirname, '../../version.json');
    const raw = fs.readFileSync(versionPath, 'utf-8');
    versionCache = JSON.parse(raw) as VersionInfo;
    return versionCache;
}

export function getVersion(): string {
    return getVersionInfo().version;
}

export function getLatestChangelog(): VersionInfo['changelog'][0] | null {
    const info = getVersionInfo();
    return info.changelog.length > 0 ? info.changelog[0] : null;
}
