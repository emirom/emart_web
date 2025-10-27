"use client";

import { queryClient } from "@lib/apis/queryClient";
import { Category, ListCategoryResponse } from "@lib/schemas";
import {
  getCategories,
  useGetCategories,
} from "@lib/services/categories/categories";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import TreeRenderAction from "./TreeRenderAction";

type TreeNode = Category & { children?: TreeNode[] };

export const TreeNodeItem = React.memo(
  ({ node, isRoot = false }: { node: TreeNode; isRoot?: boolean }) => {
    const [expanded, setExpanded] = useState(false);

    const { data, isFetching } = useQuery<ListCategoryResponse>({
      queryKey: ["category-child", node.id],
      queryFn: () =>
        getCategories({ parentId: node.id ?? null, skip: 0, limit: 20 }),
      enabled: expanded,
      staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
      if (expanded && data?.data) {
        data.data.forEach((child) => {
          queryClient.prefetchQuery({
            queryKey: ["category-child", child.id],
            queryFn: () =>
              getCategories({ parentId: child.id ?? null, skip: 0, limit: 20 }),
            staleTime: 5 * 60 * 1000,
          });
        });
      }
    }, [expanded, data]);

    const children = data?.data || [];

    return (
      <li className="relative w-full flex flex-col pr-[0.375rem]">
        {!isRoot && (
          <>
            <span className="absolute right-0 top-0 bottom-0 w-px border-r border-dotted border-gray-400" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-px border-t border-dotted border-gray-400" />
          </>
        )}
        <div
          onClick={() => setExpanded((v) => !v)}
          className="flex-1 flex-wrap flex items-center justify-between gap-2 mt-4 px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm cursor-pointer select-none relative"
        >
          <div className="flex items-center gap-2">
            {node.level && (
              <span className="text-xs text-black font-mono px-1">
                {node.level}
              </span>
            )}
            <span className="text-sm font-medium text-black">{node.name}</span>
          </div>
          <TreeRenderAction id={node.id} />
        </div>

        {expanded && isFetching && (
          <p className="text-xs text-gray-400 mr-5 mt-1">Loading...</p>
        )}

        <ul
          className="w-full flex flex-col"
          style={{ display: expanded ? "flex" : "none" }}
        >
          {children.map((child) => (
            <TreeNodeItem key={child.id} node={child} />
          ))}
        </ul>
      </li>
    );
  },
);

TreeNodeItem.displayName = "TreeNodeItem";

const TreeRender = () => {
  const { data: categories } = useGetCategories({
    parentId: null,
    skip: 0,
    limit: 20,
  });

  return (
    <ul className="tree-render w-full flex flex-col">
      {categories?.data.map((node) => (
        <TreeNodeItem key={node.id} node={node} isRoot />
      ))}
    </ul>
  );
};

export default TreeRender;
