export default function addLevel(tree, level = 0) {
  for (const node of tree) {
    node.level = level;
    if (node.children && node.children.length > 0) {
      addLevel(node.children, level + 1);
    }
  }
  return tree;
}