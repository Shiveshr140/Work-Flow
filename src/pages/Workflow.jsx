import { useParams } from "react-router-dom";
import BookingWorkflowCanvas from "../features/workflow/BookingWorkflowCanvas";
import styled from "styled-components";
import Heading from "../ui/Heading";

const StyledWorkflow = styled.div`
  width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export default function WorkflowCanvas() {
  const { bookingId } = useParams();
  return (
    <StyledWorkflow>
      <Heading as="h2">Work flow status of booking #{bookingId}</Heading>
      <BookingWorkflowCanvas paramId={bookingId} />
    </StyledWorkflow>
  );
}
