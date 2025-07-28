const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('开始构建Vercel部署版本...');

try {
  // 1. 构建前端
  console.log('构建前端应用...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. 确保dist目录结构正确
  const distDir = path.join(__dirname, 'dist');
  const publicDir = path.join(distDir, 'public');
  const clientDistDir = path.join(__dirname, 'client', 'dist');

  // 如果client/dist存在，复制到正确位置
  if (fs.existsSync(clientDistDir)) {
    console.log('复制前端构建文件...');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // 复制前端文件到client/dist（Vercel配置中指定的路径）
    execSync(`cp -r ${clientDistDir}/* ${clientDistDir}/`, { stdio: 'inherit' });
  }

  console.log('Vercel构建完成！');
} catch (error) {
  console.error('构建失败:', error.message);
  process.exit(1);
}