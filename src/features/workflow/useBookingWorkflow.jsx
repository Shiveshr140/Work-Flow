import { useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useBookingWorkflow({
  status,
  hasBreakfast,
  isPaid,
  confirmPaid,
  paramId,
}) {
  const [nodes, setNodes] = useLocalStorageState(
    [],
    `workflow-nodes-${paramId}`
  );
  const [edges, setEdges] = useLocalStorageState(
    [],
    `workflow-edges-${paramId}`
  );

  useEffect(() => {
    const getNodeStyle = (isActive) => ({
      backgroundColor: isActive
        ? "var(--color-green-300)"
        : "var(--color-white-0)",
      fontWeight: isActive ? "bold" : "normal",
    });

    // Initialize the nodes if they are empty
    if (nodes.length === 0) {
      setNodes([
        {
          id: "1",
          type: "input",
          data: {
            label:
              status === "unconfirmed" && confirmPaid
                ? "Guest is arrived"
                : status === "unconfirmed"
                ? "Guest has not arrived"
                : status === "checked-in"
                ? "Guest is arrived and checked in"
                : "Guest departed",
          },
          position: { x: 250, y: 0 },
          style: getNodeStyle(
            status === "checked-in" || status === "checked-out" || confirmPaid
          ),
        },
        {
          id: "2",
          data: {
            label:
              isPaid && hasBreakfast
                ? "Already Paid"
                : isPaid && !hasBreakfast
                ? "Already Paid (w/o breakfast)"
                : confirmPaid
                ? "Payment Confirmed"
                : "Not Paid",
          },
          position: { x: 250, y: 100 },
          style: getNodeStyle(
            (isPaid && status === "checked-in") ||
              (isPaid && status === "checked-out") ||
              confirmPaid
          ),
        },
        {
          id: "3",
          data: {
            label: hasBreakfast ? "Breakfast Added" : "Offer Breakfast",
          },
          position: { x: 250, y: 200 },
          style: getNodeStyle(
            (hasBreakfast && status === "checked-in") ||
              (hasBreakfast && status === "checked-out")
          ),
        },
        {
          id: "4",
          type: "output",
          data: {
            label: `Booking status: ${status}`,
          },
          position: { x: 250, y: 300 },
          style: getNodeStyle(status === "checked-out"),
        },
      ]);
    } else {
      // Update nodes while keeping their previous positions intact otherwise when we refresh it will move it to that position where it was initialy
      setNodes((prevNodes) => {
        return prevNodes.map((node) => {
          if (node.id === "1") {
            return {
              ...node,
              data: {
                label:
                  status === "unconfirmed" && confirmPaid
                    ? "Guest is arrived"
                    : status === "unconfirmed"
                    ? "Guest has not arrived"
                    : status === "checked-in"
                    ? "Guest is arrived and checked in"
                    : "Guest departed",
              },
              style: getNodeStyle(
                status === "checked-in" ||
                  status === "checked-out" ||
                  confirmPaid
              ),
            };
          }
          if (node.id === "2") {
            return {
              ...node,
              data: {
                label:
                  isPaid && hasBreakfast
                    ? "Already Paid"
                    : isPaid && !hasBreakfast
                    ? "Already Paid (w/o breakfast)"
                    : confirmPaid
                    ? "Payment Confirmed"
                    : "Not Paid",
              },
              style: getNodeStyle(
                (isPaid && status === "checked-in") ||
                  (isPaid && status === "checked-out") ||
                  confirmPaid
              ),
            };
          }
          if (node.id === "3") {
            return {
              ...node,
              data: {
                label: hasBreakfast ? "Breakfast Added" : "Offer Breakfast",
              },
              style: getNodeStyle(
                (hasBreakfast && status === "checked-in") ||
                  (hasBreakfast && status === "checked-out")
              ),
            };
          }
          if (node.id === "4") {
            return {
              ...node,
              data: {
                label: `Booking status: ${status}`,
              },
              style: getNodeStyle(status === "checked-out"),
            };
          }
          return node;
        });
      });
    }

    // Define edges if they don't already exist
    if (!edges.length) {
      setEdges([
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3", animated: true },
        { id: "e3-4", source: "3", target: "4", animated: true },
      ]);
    }
  }, [
    status,
    hasBreakfast,
    isPaid,
    paramId,
    edges.length,
    nodes.length,
    confirmPaid,
  ]);

  return { nodes, edges, setNodes, setEdges };
}
