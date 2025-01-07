import supabase, { supabaseUrl } from "./supabase";

// So from the supabase client we can now create queries with the from method. And so then we specify the name of the table and then the fields that we want. And so here we want basically all of them.
// And so this returns a promise which we then await. And the result of that gives us the data and a possible error.
export async function getCabins() {
  // read/get all rows
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

//// Edit cabin/create cabin, so lots of code are common for both create cabin and edit cabin so refactor this
// handle image now if edit w/o changing image hen see data we get url if we edit image then we get fileList

export async function createEditCabin(newCabin, id) {
  // sometimes it is not a string then use optional chaining
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // create/edit
  let query = supabase.from("cabins");

  // create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // edit cabin, code is from update it also need update rls policy which we did it before
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // upload image
  if (hasImagePath) return;
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there was an error in uploading a image i.e we do not want to create a cabin w/o image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Image could not be uploaded hence cabin was not created");
  }

  return data;
}
