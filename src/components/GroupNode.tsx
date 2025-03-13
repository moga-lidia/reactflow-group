import { NodeProps } from "reactflow";
import styles from "./GroupNode.module.css";

export default function GroupNode({ data, selected }: NodeProps) {
  const className = `${styles.groupNode} ${selected ? styles.selected : ""}`;

  return (
    <div
      className={className}
      style={{
        width: data.width || 300,
        height: data.height || 200,
      }}
    >
      <strong>{data.label || "Group"}</strong>
    </div>
  );
}
