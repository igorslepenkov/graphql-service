import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { TrackInput, TrackUpdateInput } from "./types";

class TracksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.TRACKS_PORT}`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.authToken}`);
  }

  async getTracks() {
    const tracks = await this.get(`/v1/tracks`);
    return tracks.items;
  }

  async getTrackById(id: string) {
    const track = await this.get(`/v1/tracks/${id}`);
    return track;
  }

  async createTrack(data: TrackInput) {
    const response = await this.post(`/v1/tracks`, data);
    return response;
  }

  async deleteTrack(id: string) {
    const response = await this.delete(`/v1/tracks/${id}`);
    return response;
  }

  async updateTrack(id: string, body: TrackUpdateInput) {
    const response = await this.put(`/v1/tracks/${id}`, body);
    return response;
  }
}

export { TracksAPI };
