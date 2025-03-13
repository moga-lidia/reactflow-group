import { useRef } from "react";
import ReactFlow, {
  useNodesState,
  Background,
  Controls,
  MiniMap,
  NodeDragHandler,
} from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes } from "../data/initialNodes";
import { nodeTypes } from "../types";

export default function NodeGroupingFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const previousPosition = useRef<{ x: number; y: number } | null>(null);

  /**
   * Stores the initial position of a group node when dragging starts.
   */
  const onNodeDragStart: NodeDragHandler = (_e, node) => {
    if (node.type === "groupNode") {
      previousPosition.current = node.position;
    }
  };

  /**
   * While dragging a group node, also move all nodes that are visually inside it.
   */
  const onNodeDrag: NodeDragHandler = (_e, node) => {
    if (node.type !== "groupNode" || !previousPosition.current) return;

    const dx = node.position.x - previousPosition.current.x;
    const dy = node.position.y - previousPosition.current.y;

    const groupX = node.position.x;
    const groupY = node.position.y;
    const groupW = node.data.width || 300;
    const groupH = node.data.height || 200;

    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) return n;

        const nx = n.position.x;
        const ny = n.position.y;

        const isInside =
          nx >= groupX &&
          nx <= groupX + groupW &&
          ny >= groupY &&
          ny <= groupY + groupH;

        if (isInside) {
          return {
            ...n,
            position: {
              x: n.position.x + dx,
              y: n.position.y + dy,
            },
          };
        }

        return n;
      })
    );

    previousPosition.current = node.position;
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
