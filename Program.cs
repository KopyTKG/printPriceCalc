

using System.Diagnostics;

class Filament {

    public string vendor { get; private set; }
    public string color { get; private set; }
    public string type { get; private set; }
    public float price { get; private set; }
    public float weight { get; private set; }

    public Filament(string vendor, string color, string type, float price, float weight) {

       this.vendor = vendor;
       this.color = color;
       this.type = type;
       this.price = price;
       this.weight = weight;
    }
}

class Master
{
    private readonly float _Margin;
    private readonly float _Energy; 
    private readonly float _PricePerHour;
    private readonly float _PostProcessingTime;
    private readonly List<Filament> _filaments;
    public Master() { 
        _filaments = FilamentLoader();
        var _config = ConfigLoader();

        foreach(var item in _config) {
            var  split = item.Split('=');
            string type = split[0];
            float value = float.Parse(split[1]);
            switch(type) {
                case "Energy":
                    _Energy = value;
                    break;

                case "Margin":
                    _Margin = value;
                    break;

                case "PricePerHour":
                    _PricePerHour = value;
                    break;

                case "PostProcessing":
                    _PostProcessingTime = value;
                    break;

                default:
                    _Energy = 15;
                    _Margin = 0.10f;
                    break;
            }
        }

        Main(); 
    }

    private static List<Filament> FilamentLoader() {
        FileStream fs = new("settings/filaments.json", FileMode.Open);
        StreamReader sr = new(fs);
        string json = sr.ReadToEnd();
        var memory = System.Text.Json.JsonSerializer.Deserialize<List<Filament>>(json);
        return memory ?? [];
    }

    private static List<string> ConfigLoader() {
        FileStream fs = new("settings/vars.config", FileMode.Open);
        StreamReader sr = new(fs);
        string raw = sr.ReadToEnd();
        List<string> memory = [.. raw.Split('\n')];
        return memory ?? [];
    }


    public void Main(){
        for(int i = 0; i < _filaments.Count; i++){ 
            var item = _filaments[i];
            Console.Write((i+1) + ") | ");
            Console.Write(item.vendor + " | ");
            Console.Write(item.color + " | ");
            Console.Write(item.type + " | ");
            Console.Write(item.price + " | ");
            Console.Write(item.weight + " | ");
            Console.WriteLine();
        }
        string input = "";
        Filament? selected = null;
        float EnergyPrice = 0;
        float UsedFilament = 0;
        float ManHours = 0;
        float PrintCosts = 0;
        float Parts = 0;
        int PrintCount = 0;

        while(selected == null){
            Console.Write("Select a filament: "); 
            input = Console.ReadLine() ?? "";
            Console.WriteLine();
            try {
                selected = _filaments[int.Parse(input) - 1];
            } catch {
                Console.WriteLine("Invalid input, please try again");
                Console.WriteLine();
            }
        }

        while(EnergyPrice == 0){ 
            Console.Write("Enter print time (hh:mm): ");
            input = Console.ReadLine() ?? "";
            Console.WriteLine();
            try {
                int[] time = input.Split(':').Select(int.Parse).ToArray();
                EnergyPrice = ((float)time[0] + (float)(time[1])/60) * _Energy;
            } catch {
                Console.WriteLine("Invalid input, please try again");
                Console.WriteLine();
            }
        }

        while(ManHours == 0){ 
            Console.Write("Enter man hours (hh:mm): ");
            input = Console.ReadLine() ?? "";
            Console.WriteLine();
            try {
                int[] time = input.Split(':').Select(int.Parse).ToArray();
                ManHours = ((float)time[0] + (float)(time[1])/60) * _PricePerHour;
            } catch {
                Console.WriteLine("Invalid input, please try again");
                Console.WriteLine();
            }
        }

        while(UsedFilament == 0){ 
            Console.Write("Enter filament usage (xx,xx): ");
            input = Console.ReadLine() ?? "";
            Console.WriteLine();
            try {
                var pricePreGram = ((((selected.weight * 100) / 1000)/100) * selected.price) / 1000;
                UsedFilament = float.Parse(input) * pricePreGram ;
            } catch {
                Console.WriteLine("Invalid input, please try again");
                Console.WriteLine();
            }
        }

        while(PrintCosts == 0){ 
            Console.Write("Enter print costs (xx,xx): ");
            input = Console.ReadLine() ?? "";
            Console.WriteLine();
            try {
                PrintCosts = float.Parse(input);
            } catch {
                Console.WriteLine("Invalid input, please try again");
                Console.WriteLine();
            }
        }
        
        while(Parts == 0){ 
            Console.Write("Enter print parts (x): ");
            input = Console.ReadLine() ?? "";
            Console.WriteLine();
            try {
                Parts = int.Parse(input) * (_PostProcessingTime * _PricePerHour);
            } catch {
                Console.WriteLine("Invalid input, please try again");
                Console.WriteLine();
            }
        }

        while(PrintCount == 0){ 
            Console.Write("Enter print count (x): ");
            input = Console.ReadLine() ?? "";
            Console.WriteLine();
            try {
                PrintCount = int.Parse(input);
            } catch {
                Console.WriteLine("Invalid input, please try again");
                Console.WriteLine();
            }
        }

        float Sum = (EnergyPrice + ManHours + UsedFilament + PrintCosts + Parts + PrintCount);
        Console.WriteLine("Energy: " + EnergyPrice);
        Console.WriteLine("ManHours: " + ManHours);
        Console.WriteLine("UsedFilament: " + UsedFilament);
        Console.WriteLine("PrintCosts: " + PrintCosts);
        Console.WriteLine("Parts: " + Parts);
        Console.WriteLine("PrintCount: " + PrintCount);

        Console.WriteLine();
        Console.WriteLine("Sum: " + Sum);
        Console.WriteLine();

        float Total = Sum * (1 + _Margin);
        Console.WriteLine("Total: " + Total);
     
    }
}


class Program 
{
    public static void Main()
    {
        _ = new Master();
    }
}
