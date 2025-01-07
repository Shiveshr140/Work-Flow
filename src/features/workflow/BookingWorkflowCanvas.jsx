import React, { useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import useCheckin from "../check-in-out/useCheckin";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useSettings } from "../settings/useSettings";
import useCheckout from "../check-in-out/useCheckout";
import { useBookingWorkflow } from "./useBookingWorkflow";
import Actions from "./Actions";

const BookingWorkflowCanvas = ({ paramId }) => {
  const { isLoading: isGettingBooking, booking: bookingData = {} } =
    useBooking();
  const { checkin } = useCheckin(Boolean(paramId));
  const { checkout } = useCheckout();
  const { settings, isLoading: isGettingSettings } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const {
    id: bookingId,
    status,
    isPaid,
    hasBreakfast,
    numNights,
    numGuests,
  } = bookingData;

  const { nodes, edges, setNodes, setEdges } = useBookingWorkflow({
    status,
    hasBreakfast,
    isPaid,
    bookingId,
    paramId,
    confirmPaid,
  });

  if (isGettingBooking || isGettingSettings) return <Spinner />;

  const saveCurrentState = () => {
    setUndoStack((prev) => [...prev, { nodes, edges }]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const previousState = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, { nodes, edges }]);
    setNodes(previousState.nodes);
    setEdges(previousState.edges);

    setUndoStack((prev) => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, { nodes, edges }]);
    setNodes(nextState.nodes);
    setEdges(nextState.edges);

    setRedoStack((prev) => prev.slice(0, -1));
  };

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  const handleCheckIn = async () => {
    if (!confirmPaid) return;
    saveCurrentState();
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  };

  const handleCheckOut = async () => {
    saveCurrentState();
    if (!bookingId) return;
    checkout(bookingId);
  };

  const onNodesChange = (changes) =>
    setNodes((prevNodes) => applyNodeChanges(changes, prevNodes));

  const onEdgesChange = (changes) =>
    setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));

  const simulateExecution = () => {
    // Save the current state of nodes before starting the simulation
    const originalNodes = JSON.parse(JSON.stringify(nodes));

    // Function to reset to the original state after the simulation
    const resetToOriginalState = () => {
      setNodes(originalNodes);
    };

    // Identify the first node (no incoming edges)
    const startNode = nodes.find(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    // Highlight the starting node first
    if (startNode) {
      setTimeout(() => {
        setNodes((prev) =>
          prev.map((node) =>
            node.id === startNode.id
              ? {
                  ...node,
                  style: { backgroundColor: "var(--color-yello-400)" },
                }
              : node
          )
        );
      }, 0);
    }

    // Simulate execution for the rest of the nodes based on edges
    edges.forEach((edge, index) => {
      setTimeout(() => {
        const targetNode = nodes.find((node) => node.id === edge.target);
        setNodes((prev) =>
          prev.map((node) =>
            node.id === targetNode.id
              ? {
                  ...node,
                  style: { backgroundColor: "var(--color-yello-400)" },
                }
              : node
          )
        );
      }, (index + 1) * 1000);
    });

    // Reset the state after the simulation completes
    setTimeout(resetToOriginalState, edges.length * 1000 + 1000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ nodes, edges });
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `workflow-${paramId}.json`;
    a.click();
  };

  return (
    <div style={{ height: "500px" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        />
      </ReactFlowProvider>

      {/* Action Buttons */}
      <div style={{ marginTop: "10px" }}>
        <Actions
          status={status}
          hasBreakfast={hasBreakfast}
          confirmPaid={confirmPaid}
          undoStack={undoStack}
          redoStack={redoStack}
          onAddBreakfast={setAddBreakfast}
          onConfirmPaid={() => setConfirmPaid(true)}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          onExport={handleExport}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSimulate={simulateExecution}
        />
      </div>
    </div>
  );
};

export default BookingWorkflowCanvas;
