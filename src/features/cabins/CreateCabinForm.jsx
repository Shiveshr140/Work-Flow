import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// function CreateCabinForm() {
//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset } = useForm();

//   const { isLoading: isCreating, mutate } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       alert("hi");
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   function onSubmit(data) {
//     console.log(data);
//     mutate(data);
//   }
//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input type="text" id="name" {...register("name")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input type="number" id="regularPrice" {...register("regularPrice")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount")}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description")}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating} type="submit">
//           Add cabin
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////**********************************************  Handling Form Errors

// function CreateCabinForm() {
//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;
//   // console.log(errors);

//   const { isLoading: isCreating, mutate } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   function onSubmit(data) {
//     console.log(data);
//     mutate(data);
//   }

//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", {
//             required: "This Field is required",
//           })}
//         />
//         {errors?.name?.message && <Error>{errors.name.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This Field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating} type="submit">
//           Add cabin
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////************************************************ Refactoring && Upload images to supabase

// Since we doing many repeated thing lets create FromRow, so lets refactor this
// Now for image input this FileInput will automatical get the type='file' as attr go an add that
// So first log that data then we will know that image is at 0th
// Go and modify the createCabin in apiCabins.jsx

// function CreateCabinForm() {
//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;
//   console.log(errors);

//   const { isLoading: isCreating, mutate } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   function onSubmit(data) {
//     console.log("data", data);
//     mutate({ ...data, image: data.image[0] });
//   }

//   // This is just to know
//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isCreating}
//           {...register("name", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isCreating}
//           {...register("maxCapacity", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isCreating}
//           {...register("regularPrice", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isCreating}
//           defaultValue={0}
//           {...register("discount", {
//             required: "This Field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           disabled={isCreating}
//           defaultValue=""
//           {...register("description", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating} type="submit">
//           Add cabin
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////************************************************************* Edit Cabin
// sometimes these value does not exist by default make it empty object, now how do we get these values into the input? Well, thankfully for us,
// there is once again a very easy way to do it with React Hook Form. So here we can actually pass in some options. And so one of those options is the defaultValues. However, if we are just using this form
// to create a new cabin, then we will not want any default values. And therefore, first of all, let's actually figure out if we are using this form to edit or to add a new cabin. So let's create a variable here which will contain that information.
// So let's call it isEditSession. And then, let's simply convert the editId to a Boolean.

// function CreateCabinForm({ cabinToEdit = {} }) {
//   const { id: editId, ...editValues } = cabinToEdit;
//   const isEditSession = Boolean(editId);

//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset, getValues, formState } = useForm({
//     defaultValues: isEditSession ? editValues : {},
//   });
//   const { errors } = formState;
//   console.log(errors);

//   const { isLoading: isCreating, mutate: createCabin } = useMutation({
//     mutationFn: createEditCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   //  So here in React Query, we can actually only pass one element to this function. So I'm not sure why that is, but so let's actually create an arrow function here. And so this will then, as we said,
//   //  only accept exactly one argument which will be this object with the newCabinData,
//   const { isLoading: isEditing, mutate: editCabin } = useMutation({
//     mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
//     onSuccess: () => {
//       toast.success("Cabin successfully edited");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const isWorking = isCreating || isEditing;

//   // Now it's time to again account for the fact that the image can either be this string right here or it can be this object that we saw earlier. So let's check for that so that we can actually determine what image we need to pass into editCabin. So here we can use the type of operator to check whether data.image is a string. And so if it is a string, then the image will just become data.image. And otherwise, so if it is that file list, then we will again need the data to be data.image at position zero. So exactly what we have here.
//   // And so then we can replace this, and then we will also be able to pass that in here. So remember that here we needed this object with newCabinData and id.
//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];
//     if (isEditSession) {
//       editCabin({ newCabinData: { ...data, image }, id: editId });
//     } else {
//       createCabin({ ...data, image: image });
//     }
//   }

//   // This is just to know
//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isWorking}
//           {...register("name", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isWorking}
//           {...register("maxCapacity", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isWorking}
//           {...register("regularPrice", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isWorking}
//           defaultValue={0}
//           {...register("discount", {
//             required: "This Field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           disabled={isWorking}
//           defaultValue=""
//           {...register("description", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: isEditSession ? false : "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isWorking} type="submit">
//           {isEditSession ? "Edit cabin" : "Create new cabin"}
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////********************************************************************** Abstracting React Query Into Custom Hooks & Add Modal
// useCreateCabin.jsx, only problem is with reset but react quesry has its sollution we can place this on success handler function not only right there but also right in the function where the mutation actually happens so all we need to do is to pass in an object of options and so then there we can do on success and then here we can very simply call the reset function
// and also this call back right here actually gets access to the data that the mutation function returns or in other words we can here get access to this new cabin data that we return right here

// if this form is ever used in some place where it isn't contained in a modal then it's not going to receive this onCloseModal prop, right? And so that means
// that we need to call this function here conditionally because again, it might not even exist. And so in that case, if it doesn't exist, then this will create a bug.
// So onSuccess, so after the cabin has been created or after it has been edited, then let's also close the modal.

// Lets fix styling type prop in Form below then Form.jsx set default prop
// Modal.jsx => add react portal

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);

  const isWorking = isCreating || isEditing;

  // we can use reset here
  function onSubmit(data) {
    console.log("data", data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // This is just to know
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This Field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
