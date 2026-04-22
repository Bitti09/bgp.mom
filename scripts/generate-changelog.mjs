import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const DATA_DIR = 'data/vps';
const OUTPUT_FILE = 'src/data/changelog.json';

// Skip generation in CI environments (like Cloudflare Pages) where git history is often incomplete (shallow clone)
if (process.env.CF_PAGES || process.env.CI || process.env.GITHUB_ACTIONS) {
    console.log('Skipping changelog generation in CI environment (using committed JSON instead).');
    process.exit(0);
}

function getProviderTitle(filePath) {
    try {
        const fullPath = path.resolve(process.cwd(), filePath);
        if (fs.existsSync(fullPath)) {
            const content = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
            return content.title || path.basename(filePath, '.json');
        }
    } catch (e) {
        // Fallback to filename
    }
    return path.basename(filePath, '.json');
}

function generateChangelog() {
    try {
        // Get git log with date, message and status of changed files
        const log = execSync(`git log --pretty=format:"COMMIT|%as|%s" --name-status -- ${DATA_DIR}`, { encoding: 'utf-8' });
        
        const commits = log.split('COMMIT|').filter(Boolean);
        const changelog = [];
        const seenChanges = new Set(); // To avoid duplicates if needed, but git history is linear

        for (const commit of commits) {
            const lines = commit.trim().split('\n');
            const [date, ...msgParts] = lines[0].split('|');
            const message = msgParts.join('|');
            
            const fileChanges = lines.slice(1).filter(line => line.includes(DATA_DIR));
            
            if (fileChanges.length === 0) continue;

            const changes = fileChanges.map(line => {
                const parts = line.trim().split(/\s+/);
                const status = parts[0][0]; // Take first character for status (A, M, D, R etc)
                const filePath = parts[parts.length - 1]; // Last part is usually the current path
                
                const type = status === 'A' ? 'ADD' : 
                             status === 'M' ? 'EDIT' : 
                             status === 'D' ? 'DELETE' : 
                             status === 'R' ? 'RENAME' : 'UPDATE';
                
                const providerName = getProviderTitle(filePath);
                
                return { type, name: providerName, filePath };
            });

            // Group by date or keep per commit? The screenshot shows multiple items for the same date.
            // Let's keep it simple: one entry per commit that has provider changes.
            changelog.push({
                date,
                message,
                changes
            });
        }

        // Ensure directory exists
        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(changelog, null, 2));
        console.log(`Changelog generated with ${changelog.length} entries.`);
    } catch (error) {
        console.error('Error generating changelog:', error);
    }
}

generateChangelog();
