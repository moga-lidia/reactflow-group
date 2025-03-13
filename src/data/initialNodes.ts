import { Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "group-1",
    type: "groupNode",
    position: { x: 100, y: 100 },
    data: { label: "Group 1", width: 300, height: 200 },
  },
  {
    id: "A",
    position: { x: 150, y: 150 },
    data: { label: "A" },
  },
  {
    id: "B",
    position: { x: 250, y: 180 },
    data: { label: "B" },
  },
  {
    id: "C",
    position: { x: 500, y: 100 },
    data: { label: "C" },
  },
];
