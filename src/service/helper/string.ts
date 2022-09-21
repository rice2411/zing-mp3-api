import mongoose from "mongoose";

export const ObjectId = (id?: string) => {
  if (!id) return new mongoose.Types.ObjectId();
  return new mongoose.Types.ObjectId(id);
};

export const isObjectId = (id?: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const instanceofObjectId = (id) => {
  return id instanceof mongoose.Types.ObjectId;
};

export const arrayRemoveDuplicates = (arr: Array<any>) => {
  let s = new Set(arr);
  return [...s];
};

export const arrayRemoveItems = (arr: Array<any>, itemRemove) => {
  return arr.filter((item) => item !== itemRemove);
};
