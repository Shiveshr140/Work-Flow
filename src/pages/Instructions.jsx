import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const Paragraph = styled.p`
  margin: 10px 0;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

function Instructions() {
  return (
    <Container>
      <Heading as="h1">About the App</Heading>
      <Paragraph>
        This app is designed for hotel staff. They can create new cabins,
        allocate cabins to bookings, manage the bookings table, view booking
        details, check guests in or out, and optionally add breakfast for
        guests. Payments are not handled within the app; guests can pay either
        before or after arrival.
      </Paragraph>
      <Heading as="h2">Dashboard</Heading>
      <Paragraph>
        1. A list of guests checking in and out on the current day. Users should
        be able to perform these tasks from here.
      </Paragraph>
      <Paragraph>
        2. Statistics on recent bookings, sales, check ins, and occupancy rate.
      </Paragraph>
      <Paragraph>
        3. A chart showing all daily hotel sales, showing both “total” sales and
        “extras” sales (only breakfast at the moment).
      </Paragraph>
      <Paragraph>
        4. A chart showing statistics on stay durations, as this is an important
        metric for the hotel.
      </Paragraph>
      <Heading as="h1">How to Use It</Heading>
      <Heading as="h2">Work-Flow: Where to Find It</Heading>
      <Paragraph>
        👉 There is a Work-Flow for every booking. You can find it on the
        booking details page and bookings page. Go to the bookings page and look
        for the vertical ellipsis icon there you find{" "}
        <BoldText> "See Work Flow" </BoldText>. Click on the "See Details" link,
        where you will find the <BoldText> "Flow #Booking ID" </BoldText> button
        . This button will take you to the Work-Flow of the corresponding
        booking.
      </Paragraph>
      <Paragraph>
        👉 Another way to access the Work-Flow is from the Check-In page. You
        will see the <BoldText> "Flow #Booking ID" </BoldText> button there as
        well.
      </Paragraph>
      <Heading as="h2">Work-Flow: How It Works</Heading>
      <Heading as="h3">There Are 4 Checkpoints for Every Booking</Heading>
      <Paragraph>
        1. Guest status: The guest may be arriving, arrived, or departed. This
        depends on the status, which can be "unconfirmed," "checked-in," or
        "checked-out."
      </Paragraph>
      <Paragraph>
        2. Payment status: Indicates whether the booking is already paid. This
        depends on the "status" and the "isPaid" property of the booking.
      </Paragraph>
      <Paragraph>
        3. Breakfast status: Indicates whether breakfast has been added. This
        depends on the "hasBreakfast" property. Breakfast is optional and can be
        added after arrival.
      </Paragraph>
      <Paragraph>4. Overall booking status.</Paragraph>
      <Heading as="h3">Action Buttons</Heading>
      <Paragraph>
        1. Save Work-Flow: This is just for display; the Work-Flow will
        automatically save.
      </Paragraph>
      <Paragraph>
        2. Breakfast Added (if the guest has already chosen it) or Breakfast
        Offer: This button will only appear if the booking status is
        "unconfirmed."
      </Paragraph>
      <Paragraph>
        3. Confirm Payment: This indicates that the guest has paid and is ready
        to be checked in.
      </Paragraph>
      <Paragraph>4. Check-In</Paragraph>
      <Paragraph>5. Check-Out</Paragraph>
      <Paragraph>6. Undo </Paragraph>
      <Paragraph>7. Redo </Paragraph>
      <Paragraph>8. Export </Paragraph>
      <Paragraph>9. Simulate Execution </Paragraph>
      <Heading as="h2">Features</Heading>
      <Paragraph>
        1. Update bookings using the regular bookings page or Work-Flow action
        buttons. Changes will automatically reflect throughout the application.
      </Paragraph>
      <Paragraph>
        2. <BoldText> React Query </BoldText>is used to manage the remote state.
        The data is stored using the <BoldText>Supabase API</BoldText>.
      </Paragraph>
      <Paragraph>
        3. The Work-Flow is stored in <BoldText>local storage</BoldText>.
      </Paragraph>
      <Paragraph>
        4. The Dashboard/Home page includes interactive graphs that show today's
        activities, sales charts, and the stay duration of guests. To see
        today's activity, you need to click on the
        <BoldText> "Upload All" and "Booking Only" </BoldText> buttons because
        sample data is available in the data folder.
      </Paragraph>
      <Button size="medium" variation="primary">
        Click "Upload All" and "Booking Only" on the Home page
      </Button>
      <Paragraph> 5. Dark/Light Mode</Paragraph>
      <Paragraph>
        6. Cabins page it has some default cabins you can add, edit, delete and
        duplicate them I have ude modal window for them using{" "}
        <BoldText>Adanced React Patterns(Compund Component)</BoldText>
      </Paragraph>
      <Paragraph>
        7. Settings page, you can see default settings of hotel you can update
        them without any update button
      </Paragraph>
      <Paragraph>
        8. Style(CSS): Styled Components , Notifications: React Hot Tost Library
        and Forms: React Hook Form
      </Paragraph>
      <Paragraph>9. Filter, Sorting, and Pagination</Paragraph>
    </Container>
  );
}

export default Instructions;
