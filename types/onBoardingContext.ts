import { AddressFormValues } from "@/schema/addressSchema";

export enum ActionType {
  CHANGE_SITE = "CHANGE_SITE",
  NAME = "NAME",
  SURNAME = "SURNAME",
  PROFILEIMAGE = "PROFILEIMAGE",
  ADDRESS = "ADDRESS",
  WORKSPACE_NAME = "WORKSPACE_NAME",
  WORKSPACE_IMAGE = "WORKSPACE_IMAGE",
}

export interface Action {
  type: ActionType;
  payload: string | number | AddressFormValues | undefined | null;
}

export interface OnboardingFormReducer {
  currentStep: 1 | 2 | 3 | 4;
  name?: string | null;
  surname?: string | null;
  profileImage?: string | null;
  address: AddressFormValues | null;
  workspaceName: string | null;
  workspaceImage?: string | null;
}

export interface OnboardingFormContext extends OnboardingFormReducer {
  dispatch: React.Dispatch<Action>;
}
