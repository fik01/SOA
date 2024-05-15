package gRPCHandlers

import (
	user_experience "encounters/proto/encounters"
	"encounters/service"
)

type EncounterHandler struct {
	user_experience.UnimplementedEncounterServiceServer
	UserExperienceService *service.UserExperienceService
}
