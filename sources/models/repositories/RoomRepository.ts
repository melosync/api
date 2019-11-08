import Models from "../Models";
import { RoomDocument } from "../schemas/RoomSchema";
import Room from "../../core/types/Room";
import RoomMember from "../../core/types/RoomMember";

export default class RoomRepository {
  private readonly models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  /**
   * Create a new Room
   *
   * @param room  The Room to create
   *
   * @return  The created Room
   */
  public readonly create = async (room: Room): Promise<RoomDocument> => {
    return this.models.roomModel.create(room);
  };

  /**
   * Find a specific Room using its `uuid`
   *
   * @param uuid The uuid of the Room to look for
   *
   * @return  The corresponding Room or `null`
   */
  public readonly findOneByUuid = async (
    uuid: string,
  ): Promise<RoomDocument | null> => {
    return this.models.roomModel.findOne({ uuid }).exec();
  };

  /**
   * Get all rooms
   *
   * @return  All rooms
   */
  public readonly getAll = async (): Promise<Room[]> => {
    return this.models.roomModel.find().exec();
  };

  /**
   * @param uuid The uuid of the Room
   * @param roomMember The roomMember to add to the room
   * Add a user to a room
   */
  public readonly addUser = async (
    room: RoomDocument,
    roomMember: RoomMember,
  ): Promise<void> => {
    room.members.push(roomMember);
    await room.save();
  };
}
