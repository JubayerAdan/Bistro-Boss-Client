import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItem = () => {
  const Image_Upload_Api_Key = import.meta.env.VITE_Image_Upload_Api_Key;
  const Image_Hosting_Url = `https://api.imgbb.com/1/upload?key=${Image_Upload_Api_Key}`;
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(Image_Hosting_Url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imageUrl = imgResponse.data.display_url;
          const { name, price, category, recipe } = data;
          const menuItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imageUrl,
          };
          console.log(menuItem);
          axiosSecure.post("/menu", menuItem).then((data) => {
            console.log(data.data);
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item Added Succesfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
        console.log(imgResponse);
      });
  };
  return (
    <div className="px-10">
      <SectionTitle
        subHeading={"What's new"}
        heading={"Add an item"}
      ></SectionTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text font-semibold">Recipe Name*</span>
          </div>
          <input
            type="text"
            placeholder="Recipe Name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full max-w-2xl"
          />
        </label>
        <div className="flex space-x-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>
            <select
              defaultValue="Pick one"
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick one</option>
              <option>Pizza</option>
              <option>Soup</option>
              <option>Desi</option>
              <option>Salad</option>
              <option>Desserts</option>
              <option>Drinks</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">Price*</span>
            </div>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Recipe Details</span>
          </div>
          <textarea
            {...register("details", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Item image</span>
          </div>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </label>
        <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItem;
