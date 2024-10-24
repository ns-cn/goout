#!/bin/bash

# 生成新的版本号
new_version=$(date "+%Y.%m.%d%H%M")

# 更新 version.js 文件
echo "const version = '$new_version';" > backend/version.js
echo "" >> backend/version.js
echo "module.exports = {" >> backend/version.js
echo "  version: version" >> backend/version.js
echo "};" >> backend/version.js

# 将更新后的 version.js 添加到本次提交
git add backend/version.js

echo "版本号已更新到 $new_version"
