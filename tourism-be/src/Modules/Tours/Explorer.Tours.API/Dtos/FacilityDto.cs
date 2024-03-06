namespace Explorer.Tours.API.Dtos
{
    public class FacilityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Uri Image { get; set; }
        public int Category { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
