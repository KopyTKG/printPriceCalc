using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

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
        Console.WriteLine(Filaments.Count);
        foreach(var item in Filaments) {
            Console.WriteLine(item.Price);
            Console.WriteLine(item.Vendor + " " + item.Color);
            var tmp = new Button();
            tmp.Content += item.Vendor + " " + item.Color;
            tmp.FontSize = 10;

            stack.Children.Add(tmp);
        }
    }
    private List<Filament> FilamentLoader() {
        FileStream fs = new("settings/filaments.json", FileMode.Open);
        StreamReader sr = new(fs);
        string json = sr.ReadToEnd();
        var memory = JsonSerializer.Deserialize<List<Filament>>(json);
        Console.WriteLine(memory.ToString());
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