# dont use shell to excute commands this way the commands are treated as strings and no interpretation of ; && |
cmd := exec.Command("ping", "-c", "3", ip)
# add a parser so that only ip will be accepted
if net.ParseIP(ip) == nil {
    http.Error(w, "Invalid IP", http.StatusBadRequest)
    return
}
