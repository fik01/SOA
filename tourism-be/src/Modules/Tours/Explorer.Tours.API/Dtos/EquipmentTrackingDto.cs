namespace Explorer.Tours.API.Dtos;

public class EquipmentTrackingDto
{
    public int Id { get; set; }
    public long TouristId { get; set; }
    public List<long> NeededEquipment { get; set; }
}