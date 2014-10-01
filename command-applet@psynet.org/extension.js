/* Comand Applet Extension
 * author: einfachnuralex
 * 8/25/12
 * version 1.1.1
 * some code also by Panel Commands by Denoyse <denoyse@gmail.com>.
 * Thanks to gcampax (https://extensions.gnome.org/accounts/profile/gcampax) for most of the code ;-)
 */


const GLib = imports.gi.GLib;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

function Indicator() {
    this._init.apply(this, arguments);
}

Indicator.prototype = {
    __proto__: PanelMenu.SystemStatusButton.prototype,

    _init: function() {
        PanelMenu.SystemStatusButton.prototype._init.call(this, 'media-removable-symbolic'); 
        this._createMenu();
    },

    _createMenu: function() {
        this._addCommand("Standby sdb", "sudo hdparm -y /dev/sdb",this.menu);
        this._addCommand("Ptrace", "echo 0|sudo tee /proc/sys/kernel/yama/ptrace_scope",this.menu);
//        this._addCommand("Clone Displays", "disper --clone", this.menu);
    },

    _addSeparator: function() {
    	this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
    },

    _addCommand: function(label, command, menu) {
    	menu.addAction(_(label), function() { 
            try {
                GLib.spawn_command_line_async(command);
            } catch(e) {
                Main.notify('This extension requires Disper to be installed.');
            }
        });
    },
}


function init() {}

let _indicator;

function enable() {
    _indicator = new Indicator();
    Main.panel.addToStatusArea('command', _indicator);
}

function disable() {
    _indicator.destroy();
}
