#!/bin/bash
echo "=== Photo Editor Art 品牌替换检查 ==="

# 检查是否还有旧品牌名称
echo "1. 检查是否还有 'Aiartools':"
grep -r "Aiartools" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude="*.backup" --exclude="*.bak" || echo "✅ 未发现旧品牌名称"

# 检查关键文件是否更新
echo ""
echo "2. 检查 package.json:"
grep "photo-editor-art" package.json && echo "✅ 项目名称已更新" || echo "❌ 项目名称未更新"

# 检查SEO关键词
echo ""
echo "3. 检查英文SEO关键词:"
grep "photo editor" messages/en.json && echo "✅ 英文SEO已更新" || echo "❌ 英文SEO未更新"

echo ""
echo "4. 检查中文SEO关键词:"
grep "照片编辑器" messages/zh.json && echo "✅ 中文SEO已更新" || echo "❌ 中文SEO未更新"

# 检查关键组件文件
echo ""
echo "5. 检查关键文件中的新品牌名称:"
FILES_TO_CHECK=(
  "messages/en.json"
  "messages/zh.json"
  "package.json"
)

for file in "${FILES_TO_CHECK[@]}"; do
  if [ -f "$file" ]; then
    count=$(grep -c "Photo Editor Art" "$file" 2>/dev/null || echo "0")
    echo "   $file: $count 处提及新品牌"
  else
    echo "   ❌ $file 文件不存在"
  fi
done

# 检查备份文件
echo ""
echo "6. 检查备份文件:"
ls -la *.backup *.bak 2>/dev/null | head -5 && echo "✅ 备份文件已创建" || echo "❌ 未找到备份文件"

echo ""
echo "=== 检查完成 ==="
echo "如果所有检查都显示 ✅，则品牌替换成功完成！" 