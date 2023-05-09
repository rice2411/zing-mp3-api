import mongoose, { Types } from "mongoose";
import { SONG_DEFAULT } from "../constants/model/song";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const SongSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    image: {
      type: String,
      default: SONG_DEFAULT.IMAGE_DEFAULT,
    },
    audio: {
      type: String,
      require: true,
    },
    likes: {
      type: Number,
      required: true,
      default: SONG_DEFAULT.LIKE_DEFAULT,
    },
    views: {
      type: Array<Number>,
      require: true,
    },
    artistId: {
      type: mongoose.Types.ObjectId,
      default: SONG_DEFAULT.ARTIST_ID_DEFAULT,
      require: true,
    },
    countryId: {
      type: mongoose.Types.ObjectId,
      default: SONG_DEFAULT.COUNTRY_ID_DEFAULT,
      require: true,
    },
    originAlbumId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    albumIds: {
      type: Array,
      require: true,
    },
    typeIds: {
      type: Array,
      require: true,
    },
    followers: {
      type: Array,
      require: true,
    },
    is_vip: {
      type: Boolean,
      require: true,
      default: 0,
    },
    totalViews: {
      type: Number,
      require: true,
      default: 0,
    },
    lyrics: {
      type: Object,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export interface ISong extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  image: string;
  audio: string;
  likes: Number;
  views: Array<Number>;
  artistId: Types.ObjectId;
  artist: Object;
  createdAt: Date;
  updatedAt: Date;
  countryId: mongoose.Types.ObjectId;
  originAlbumId: mongoose.Types.ObjectId;
  albumIds: Array<mongoose.Types.ObjectId>;
  followers: Array<mongoose.Types.ObjectId>;
  typeIds: Array<mongoose.Types.ObjectId>;
  totalViews: Number;
  is_vip: Boolean;
  lyrics: Object;
  isDelete: boolean;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ISongModel extends mongoose.Model<ISong> {
  aggregatePaginateCustom(
    aggregates: mongoose.Aggregate<any[]>,
    arg1: { page: number; limit: number }
  ): any;
  get(_id: string): Promise<any>;
  list({
    skip,
    limit,
    is_paginate,
    search,
  }?: {
    skip?: number;
    limit?: number;
    is_paginate: boolean;
    search: string;
  }): Promise<any>;
  execAsync(): Promise<any>;
}

SongSchema.plugin(paginate);
SongSchema.plugin(aggregatePaginate);

SongSchema.index({
  name: "text",
});

const model = mongoose.model<ISong, ISongModel>("Song", SongSchema);
export { model as Song };
