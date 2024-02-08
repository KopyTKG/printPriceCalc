using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Primitives;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using Avalonia.Win32.Interop.Automation;

namespace printPriceCalc;

public partial class MainWindow : Window
{
    private readonly float _Margin;
    private readonly float _Energy; 
    private readonly float _PricePerHour;
    private readonly float _PostProcessingTime;
    private readonly List<Filament> _filaments;

    public MainWindow()
    {   
        InitializeComponent();

        this._filaments = this.FilamentLoader();
        var _config = this.ConfigLoader();

        foreach(var item in _config) {
            var  split = item.Split('=');
            string type = split[0];
            float value = float.Parse(split[1]);
            switch(type) {
                case "Energy":
                    this._Energy = value;
                    break;

                case "Margin":
                    this._Margin = value;
                    break;

                case "PricePerHour":
                    this._PricePerHour = value;
                    break;

                case "PostProcessing":
                    this._PostProcessingTime = value;
                    break;
            }
        }
    }

    private void FilamentsRender(List<Filament> Filaments) {
        StackPanel stack = this.Find<StackPanel>("FilamentStack") ?? new StackPanel();
        for(int i = 0; i< Filaments.Count; i++) {
            var item = Filaments[i];
            Button button = new()
            {
                Content = "Add",
            };
            button.Click += (sender, e) => AddClicked(item);

            UniformGrid grid = new()
            {   
                Rows = 1,
                MinWidth = 30,
            };

            var vendor = new TextBlock
            {
                Text = item.Vendor
            };

            var color = new TextBlock
            {
                Text = item.Color
            };

            var type = new TextBlock
            {
                Text = item.Type
            };

            var price = new TextBlock
            {
                Text = item.Price.ToString()
            };

            var weight = new TextBlock
            {
                Text = item.Weight.ToString()
            };
            
            grid.Children.Add(button);
            grid.Children.Add(vendor);
            grid.Children.Add(color);
            grid.Children.Add(type);
            grid.Children.Add(price);
            grid.Children.Add(weight);


            stack.Children.Add(grid);
        }
    }

    private static void AddClicked(Filament item)
    {
        Console.WriteLine($"Object {item.Vendor} {item.Color} has been clicked" );
    }
    private List<Filament> FilamentLoader() {
        FileStream fs = new("settings/filaments.json", FileMode.Open);
        StreamReader sr = new(fs);
        string json = sr.ReadToEnd();
        var splitted = json.Replace("[", "").Replace("]","").Replace("{","").Split("},");
        var memory = new List<Filament>();
        foreach(var split in splitted) {
            var items = split.Split(",");
            string Vendor = "", Color = "", Type = "";
            float Price = 0;
            float Weight = 0;
            foreach(var item in items) {
                if(item == "}") break;
                var line = item.Replace("}", "").Trim().Replace("\"","").Split(": ");
                switch(line[0]) {
                    case "vendor":
                        Vendor = line[1];
                        break;
                    case "color":
                        Color = line[1];
                        break;
                    case "type":
                        Type = line[1];
                        break;
                    case "price":
                        Price = float.Parse(line[1]);
                        break;
                    case "weight":
                        Weight = float.Parse(line[1]);
                        break;
                }
            }
            memory.Add(new Filament(Vendor, Color, Type, Price, Weight));
        }
        
        FilamentsRender(memory);
        return memory ?? [];
    }

    private List<string> ConfigLoader() {
        FileStream fs = new("settings/vars.config", FileMode.Open);
        StreamReader sr = new(fs);
        string raw = sr.ReadToEnd();
        List<string> memory = [.. raw.Split('\n')];
        return memory ?? [];
    }

    public void Exit_Click(object source, RoutedEventArgs args) {
        Process process = Process.GetCurrentProcess();
        process.Kill();
    }
}