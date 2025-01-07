import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";

function Actions({
  status,
  hasBreakfast,
  confirmPaid,
  onCheckIn,
  onCheckOut,
  onAddBreakfast,
  onConfirmPaid,
  onExport,
  undoStack,
  redoStack,
  onUndo,
  onRedo,
  onSimulate,
}) {
  return (
    <ButtonGroup>
      <Button
        variation="primary"
        size="small"
        data-tooltip-id="onSimulate"
        data-tooltip-content="Simulate this workflow"
        onClick={onSimulate}
      >
        Simulate Execution
      </Button>
      <Button
        variation="primary"
        size="small"
        data-tooltip-id="onExport"
        data-tooltip-content="Export this workflow"
        onClick={onExport}
      >
        Export Workflow
      </Button>
      <Button
        variation="primary"
        size="small"
        data-tooltip-id="onSave"
        data-tooltip-content="Save this workflow"
        onClick={() => toast.success("Work flow saved successfully")}
      >
        Save Workflow
      </Button>
      {status === "unconfirmed" && (
        <Button
          variation="primary"
          size="small"
          onClick={() => {
            toast.success("Breakfast successfully added");
            onAddBreakfast(true);
          }}
          disabled={hasBreakfast}
        >
          {hasBreakfast ? "Breakfast Added" : "Offer Breakfast"}
        </Button>
      )}
      {status === "unconfirmed" && (
        <Button
          variation="primary"
          size="small"
          onClick={() => {
            onConfirmPaid();
            toast.success("Payment confirmed successfully!");
          }}
          disabled={confirmPaid}
        >
          Confirm Payment
        </Button>
      )}
      {status === "unconfirmed" && (
        <Button variation="primary" size="small" onClick={onCheckIn}>
          Check In
        </Button>
      )}
      {status === "checked-in" && (
        <Button variation="primary" size="small" onClick={onCheckOut}>
          Check Out
        </Button>
      )}
      <Button
        variation="secondary"
        size="small"
        data-tooltip-id="onUndo"
        data-tooltip-content="Undo the last valid action"
        onClick={onUndo}
        disabled={undoStack.length === 0}
      >
        Undo
      </Button>
      <Button
        variation="secondary"
        size="small"
        data-tooltip-id="onRedo"
        data-tooltip-content="Redo the last valid action"
        onClick={onRedo}
        disabled={redoStack.length === 0}
      >
        Redo
      </Button>
      <Tooltip id="onRedo" />
      <Tooltip id="onUndo" />
      <Tooltip id="onSave" />
      <Tooltip id="onExport" />
      <Tooltip id="onSimulate" />
    </ButtonGroup>
  );
}

export default Actions;
