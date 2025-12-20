"use client";

import { useEffect, useState } from "react";
// Use native fetch against MSW handlers in tests to avoid axios/interceptor issues

type Category = { id: string; name: string; level?: number };

const TreeNodeItem = ({
  node,
  isRoot = false,
}: {
  node: Category;
  isRoot?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    let mounted = true;
    setLoading(true);
    const parentIdParam = node.id ?? "null";
    fetch(`/categories?parentId=${parentIdParam}&skip=0&limit=20`)
      .then((r) => r.json())
      .then((res) => {
        if (mounted) {
          setChildren(res.data || []);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [expanded, node.id]);

  return (
    <li>
      <div onClick={() => setExpanded((v) => !v)}>
        {node.level && <span>{node.level}</span>}
        <span>{node.name}</span>
      </div>

      {expanded && loading && <p>Loading...</p>}

      <ul style={{ display: expanded ? "block" : "none" }}>
        {children.map((child: Category) => (
          <TreeNodeItem key={child.id} node={child} />
        ))}
      </ul>
    </li>
  );
};

const TreeRenderWrapper = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch(`/categories?parentId=null&skip=0&limit=20`)
      .then((r) => r.json())
      .then((res) => {
        if (mounted) setCategories(res.data || []);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ul className="tree-render">
      {categories.map((node: Category) => (
        <TreeNodeItem key={node.id} node={node} isRoot />
      ))}
    </ul>
  );
};

export default TreeRenderWrapper;
