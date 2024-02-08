namespace printPriceCalc;
public class Filament {
    public string Vendor { get; set; }
    public string Color { get; set; }
    public string Type { get; set; }
    public float Price { get; set; }
    public float Weight { get; set; }

    public Filament() {
        // Parameterless constructor
    }

    // Parameterized constructor can still exist for other uses
    public Filament(string vendor, string color, string type, float price, float weight) {
        Vendor = vendor;
        Color = color;
        Type = type;
        Price = price;
        Weight = weight;
    }
}
